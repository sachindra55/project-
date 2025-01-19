import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Euler, Quaternion } from 'three';
import { InteractiveObject } from '../data/tourData';

interface CameraControllerProps {
  moveSpeed?: number;
  mouseSensitivity?: number;
  interactiveObjects?: InteractiveObject[];
  onPortalEnter?: (targetLocation: string) => void;
}

export function CameraController({ 
  moveSpeed = 0.5,
  mouseSensitivity = 0.003,
  interactiveObjects = [],
  onPortalEnter
}: CameraControllerProps) {
  const { camera } = useThree();
  const keys = useRef<{ [key: string]: boolean }>({});
  const movement = useRef(new Vector3());
  const currentSpeed = useRef(0);
  const targetSpeed = useRef(0);
  const lastPortalTrigger = useRef<string | null>(null);
  const portalCooldown = useRef<number>(0);
  const isMouseLocked = useRef(false);
  const euler = useRef(new Euler(0, 0, 0, 'YXZ'));
  const targetRotation = useRef(new Quaternion());
  const smoothedRotation = useRef(new Quaternion());

  // Initialize camera
  useEffect(() => {
    camera.rotation.order = 'YXZ';
    euler.current.setFromQuaternion(camera.quaternion);
  }, [camera]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      
      if (['w', 'a', 's', 'd', 'shift'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseLocked.current) return;

      // Apply mouse sensitivity and convert to radians
      const dx = e.movementX * mouseSensitivity;
      const dy = e.movementY * mouseSensitivity;

      // Update euler angles
      euler.current.y -= dx;
      euler.current.x = Math.max(
        -Math.PI / 2 + 0.01,
        Math.min(Math.PI / 2 - 0.01, euler.current.x - dy)
      );

      // Update target rotation
      targetRotation.current.setFromEuler(euler.current);
    };

    const handleClick = () => {
      if (!isMouseLocked.current) {
        document.body.requestPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      isMouseLocked.current = document.pointerLockElement !== null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [mouseSensitivity]);

  useFrame((state, delta) => {
    // Smooth camera rotation
    smoothedRotation.current.slerp(targetRotation.current, 0.15);
    camera.quaternion.copy(smoothedRotation.current);

    // Calculate movement direction based on camera rotation
    const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

    // Reset movement vector
    movement.current.set(0, 0, 0);

    // Determine if any movement key is pressed
    const isMoving = keys.current['w'] || keys.current['s'] || keys.current['a'] || keys.current['d'];
    
    // Set target speed based on sprint and movement
    if (isMoving) {
      targetSpeed.current = keys.current['shift'] ? moveSpeed * 2 : moveSpeed;
    } else {
      targetSpeed.current = 0;
    }

    // Smooth speed transition
    currentSpeed.current += (targetSpeed.current - currentSpeed.current) * delta * 10;

    // Handle WASD movement with current speed
    if (keys.current['w']) movement.current.add(forward.multiplyScalar(currentSpeed.current));
    if (keys.current['s']) movement.current.add(forward.multiplyScalar(-currentSpeed.current));
    if (keys.current['a']) movement.current.add(right.multiplyScalar(-currentSpeed.current));
    if (keys.current['d']) movement.current.add(right.multiplyScalar(currentSpeed.current));

    // Apply movement with delta time
    camera.position.add(movement.current.multiplyScalar(delta * 60));

    // Update portal cooldown
    if (portalCooldown.current > 0) {
      portalCooldown.current -= delta;
    }

    // Check proximity to interactive objects
    if (onPortalEnter && portalCooldown.current <= 0) {
      const cameraPosition = camera.position;
      
      interactiveObjects.forEach(obj => {
        if (obj.type === 'portal' && obj.targetLocation) {
          const objPosition = new Vector3(...obj.position);
          const distance = cameraPosition.distanceTo(objPosition);
          
          // If within 2 units of a portal and it's not the last portal we entered
          if (distance < 2 && obj.targetLocation !== lastPortalTrigger.current) {
            lastPortalTrigger.current = obj.targetLocation;
            portalCooldown.current = 1; // 1 second cooldown
            onPortalEnter(obj.targetLocation);
          }
        }
      });
    }
  });

  return null;
}
