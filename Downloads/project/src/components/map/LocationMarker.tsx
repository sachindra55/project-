import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Location } from '../../data/communityData';

interface LocationMarkerProps {
  location: Location;
  onClick?: (locationId: string) => void;
}

export function LocationMarker({ location, onClick }: LocationMarkerProps) {
  const markerRef = useRef<THREE.Group>();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!markerRef.current) {
      // Create marker group
      const group = new THREE.Group();

      // Create pin geometry
      const pinGeometry = new THREE.ConeGeometry(0.5, 2, 8);
      const pinMaterial = new THREE.MeshPhongMaterial({
        color: getColorForLocationType(location.type),
        emissive: 0x222222,
        specular: 0x999999,
        shininess: 30
      });
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      pin.rotation.x = Math.PI;
      pin.position.y = 1;

      // Create label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 256;
        canvas.height = 128;
        context.fillStyle = '#ffffff';
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.fillText(location.name, 128, 64);

        const texture = new THREE.CanvasTexture(canvas);
        const labelGeometry = new THREE.PlaneGeometry(4, 2);
        const labelMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.y = 3;
        label.rotation.x = -Math.PI / 2;

        group.add(label);
      }

      group.add(pin);
      group.position.set(location.coordinates[0], 0, location.coordinates[1]);

      // Add interactivity
      group.userData = {
        type: 'location',
        id: location.id,
        hoverable: true,
        clickable: true
      };

      markerRef.current = group;
    }

    // Update marker appearance based on hover state
    if (markerRef.current) {
      const pin = markerRef.current.children[1] as THREE.Mesh;
      const material = pin.material as THREE.MeshPhongMaterial;
      
      if (isHovered) {
        material.emissive.setHex(0x666666);
        markerRef.current.scale.setScalar(1.2);
      } else {
        material.emissive.setHex(0x222222);
        markerRef.current.scale.setScalar(1.0);
      }
    }
  }, [location, isHovered]);

  return null; // This is a Three.js component, so it doesn't return JSX
}

function getColorForLocationType(type: Location['type']): number {
  switch (type) {
    case 'healthcare':
      return 0xff0000; // Red
    case 'education':
      return 0x0000ff; // Blue
    case 'business':
      return 0x00ff00; // Green
    case 'community':
      return 0xffff00; // Yellow
    case 'recreation':
      return 0xff00ff; // Purple
    default:
      return 0xcccccc; // Gray
  }
}

// Add this to your Three.js scene setup
export function setupLocationMarkers(scene: THREE.Scene, locations: Location[], onMarkerClick: (locationId: string) => void) {
  locations.forEach(location => {
    const marker = new LocationMarker({ location, onClick: onMarkerClick });
    if (marker.markerRef.current) {
      scene.add(marker.markerRef.current);
    }
  });

  // Add raycaster for interactivity
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, scene.userData.camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    let hoveredMarker = null;
    for (const intersect of intersects) {
      const object = intersect.object;
      if (object.userData?.type === 'location') {
        hoveredMarker = object;
        break;
      }
    }

    scene.children.forEach(child => {
      if (child.userData?.type === 'location') {
        const marker = child as THREE.Group;
        marker.userData.hovered = marker === hoveredMarker;
      }
    });
  });

  window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, scene.userData.camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    for (const intersect of intersects) {
      const object = intersect.object;
      if (object.userData?.type === 'location' && object.userData?.clickable) {
        onMarkerClick(object.userData.id);
        break;
      }
    }
  });
}
