import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function AnimatedScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(8, 8, 8);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 5;
    controls.maxDistance = 15;

    // Create stylized terrain
    const terrainGeometry = new THREE.PlaneGeometry(25, 25, 128, 128);
    const terrainMaterial = new THREE.MeshPhongMaterial({
      color: 0x90EE90,
      wireframe: false,
      side: THREE.DoubleSide,
      shininess: 0
    });

    // Add height variation to terrain
    const vertices = terrainGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];
      vertices[i + 1] = Math.sin(x * 0.2) * Math.cos(z * 0.2) * 0.5;
    }
    terrainGeometry.computeVertexNormals();

    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // Helper function to create a window
    const createWindow = (width: number, height: number) => {
      const geometry = new THREE.PlaneGeometry(width, height);
      const material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        emissive: 0x666666,
        transparent: true,
        opacity: 0.9
      });
      return new THREE.Mesh(geometry, material);
    };

    // Helper function to create a roof
    const createRoof = (width: number, depth: number, height: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(-width/2, -depth/2);
      shape.lineTo(width/2, -depth/2);
      shape.lineTo(0, height);
      shape.lineTo(-width/2, -depth/2);

      const extrudeSettings = {
        steps: 1,
        depth: depth,
        bevelEnabled: false
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
      return new THREE.Mesh(geometry, material);
    };

    // Helper function to create a building
    const createBuilding = (
      x: number, 
      z: number, 
      width: number, 
      height: number, 
      depth: number,
      color: number,
      type: 'house' | 'hospital' | 'school' | 'shop'
    ) => {
      const group = new THREE.Group();
      
      // Main building
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshPhongMaterial({ color });
      const building = new THREE.Mesh(geometry, material);
      building.position.set(0, height/2, 0);
      building.castShadow = true;
      building.receiveShadow = true;
      group.add(building);

      // Roof
      if (type === 'house') {
        const roof = createRoof(width * 1.2, depth * 1.2, height * 0.4);
        roof.position.set(0, height, depth/2);
        roof.castShadow = true;
        group.add(roof);
      }

      // Windows
      const windowWidth = width * 0.15;
      const windowHeight = height * 0.2;
      const windowSpacing = width * 0.25;
      const windowRows = type === 'hospital' ? 4 : (type === 'school' ? 3 : 2);
      const windowCols = type === 'hospital' ? 5 : (type === 'school' ? 4 : 2);

      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          const window = createWindow(windowWidth, windowHeight);
          window.position.set(
            (col - (windowCols-1)/2) * windowSpacing,
            height * (0.3 + row * 0.25),
            depth/2 + 0.01
          );
          group.add(window);

          // Add windows to other sides for larger buildings
          if (type !== 'house') {
            const sideWindow = createWindow(windowWidth, windowHeight);
            sideWindow.position.set(
              width/2 + 0.01,
              height * (0.3 + row * 0.25),
              (col - (windowCols-1)/2) * windowSpacing
            );
            sideWindow.rotation.y = Math.PI/2;
            group.add(sideWindow);
          }
        }
      }

      // Special features based on building type
      if (type === 'hospital') {
        // Add hospital cross
        const crossGeometry = new THREE.BoxGeometry(width * 0.15, height * 0.3, 0.1);
        const crossMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
        const verticalCross = new THREE.Mesh(crossGeometry, crossMaterial);
        const horizontalCross = new THREE.Mesh(crossGeometry, crossMaterial);
        horizontalCross.rotation.z = Math.PI/2;
        
        const crossGroup = new THREE.Group();
        crossGroup.add(verticalCross);
        crossGroup.add(horizontalCross);
        crossGroup.position.set(0, height * 0.8, depth/2 + 0.1);
        group.add(crossGroup);
      } else if (type === 'school') {
        // Add flagpole
        const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, height * 0.8);
        const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.set(width/2 + 1, height * 0.4, depth/2);
        group.add(pole);

        // Add flag
        const flagGeometry = new THREE.PlaneGeometry(1, 0.6);
        const flagMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x4169E1,
          side: THREE.DoubleSide
        });
        const flag = new THREE.Mesh(flagGeometry, flagMaterial);
        flag.position.set(width/2 + 1.5, height * 0.7, depth/2);
        group.add(flag);
      }

      // Add entrance
      const doorWidth = width * 0.2;
      const doorHeight = height * 0.3;
      const doorGeometry = new THREE.PlaneGeometry(doorWidth, doorHeight);
      const doorMaterial = new THREE.MeshPhongMaterial({ 
        color: type === 'hospital' ? 0x4169E1 : 0x8B4513
      });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(0, doorHeight/2, depth/2 + 0.01);
      group.add(door);

      // Add steps
      const stepsGeometry = new THREE.BoxGeometry(doorWidth * 1.5, height * 0.05, depth * 0.2);
      const stepsMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
      const steps = new THREE.Mesh(stepsGeometry, stepsMaterial);
      steps.position.set(0, height * 0.02, depth/2 + depth * 0.1);
      group.add(steps);

      group.position.set(x, 0, z);
      return group;
    };

    // Add various buildings
    scene.add(createBuilding(-5, -5, 7, 6, 5, 0xFFFFFF, 'hospital')); // Hospital
    scene.add(createBuilding(5, 5, 6, 4, 4, 0xE6C35C, 'school'));      // School
    scene.add(createBuilding(-4, 4, 2.5, 2, 2.5, 0xCC8866, 'house'));  // House 1
    scene.add(createBuilding(4, -4, 2.5, 2, 2.5, 0xAA7755, 'house'));  // House 2
    scene.add(createBuilding(-2.5, 0, 2.5, 2, 2.5, 0xBB9988, 'house')); // House 3
    scene.add(createBuilding(2.5, 0, 2.5, 2, 2.5, 0xDDAA99, 'house')); // House 4
    scene.add(createBuilding(0, 2.5, 2.5, 2, 2.5, 0xCCBBAA, 'house')); // House 5
    scene.add(createBuilding(0, -2.5, 4, 3, 3, 0x99AACC, 'shop'));     // Shop

    // Add trees
    const addTree = (x: number, z: number, scale = 1) => {
      const trunkGeometry = new THREE.CylinderGeometry(0.2 * scale, 0.3 * scale, 1 * scale);
      const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.set(x, 0.5 * scale, z);
      trunk.castShadow = true;
      trunk.receiveShadow = true;

      const leavesGeometry = new THREE.ConeGeometry(1 * scale, 2 * scale, 8);
      const leavesMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.set(x, 2 * scale, z);
      leaves.castShadow = true;
      leaves.receiveShadow = true;

      scene.add(trunk);
      scene.add(leaves);
    };

    // Add trees around the scene
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 10 + Math.random() * 2.5;
      const scale = 0.4 + Math.random() * 0.2;
      addTree(Math.cos(angle) * radius, Math.sin(angle) * radius, scale);
    }

    // Add roads
    const roadGeometry = new THREE.PlaneGeometry(20, 1);
    const roadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      side: THREE.DoubleSide
    });
    
    // Horizontal road
    const horizontalRoad = new THREE.Mesh(roadGeometry, roadMaterial);
    horizontalRoad.rotation.x = -Math.PI/2;
    horizontalRoad.position.y = 0.01;
    scene.add(horizontalRoad);

    // Vertical road
    const verticalRoad = new THREE.Mesh(roadGeometry, roadMaterial);
    verticalRoad.rotation.x = -Math.PI/2;
    verticalRoad.rotation.z = Math.PI/2;
    verticalRoad.position.y = 0.01;
    scene.add(verticalRoad);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(50, 50, 50);
    sunLight.castShadow = true;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Add point lights for buildings
    const addPointLight = (x: number, z: number, intensity = 1, color = 0xffffaa) => {
      const light = new THREE.PointLight(color, intensity, 5);
      light.position.set(x, 1, z);
      scene.add(light);
    };

    // Add lights for major buildings
    addPointLight(-5, -5, 2, 0xaaccff); // Hospital
    addPointLight(5, 5, 1.5, 0xffccaa); // School
    addPointLight(0, -2.5, 1, 0xffffaa); // Shop

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
