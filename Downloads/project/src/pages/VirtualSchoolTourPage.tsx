import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ArrowLeft, BookOpen, Microscope, Laptop, Users2, GraduationCap, ArrowRight } from 'lucide-react';

interface InteractiveSpot {
  id: string;
  name: string;
  description: string;
  position: THREE.Vector3;
  icon: any;
}

export function VirtualSchoolTourPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSpot, setSelectedSpot] = useState<InteractiveSpot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const spotsRef = useRef<{ [key: string]: THREE.Mesh & { spotData?: InteractiveSpot } }>({});
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87ceeb); // Sky blue background

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x90EE90,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);

    // Create main building
    const buildingGeometry = new THREE.BoxGeometry(20, 15, 30);
    const buildingMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf5f5f5,
      specular: 0x111111,
      shininess: 30,
    });
    const mainBuilding = new THREE.Mesh(buildingGeometry, buildingMaterial);
    mainBuilding.position.set(0, 7, 0);
    scene.add(mainBuilding);

    // Add windows
    const windowGeometry = new THREE.PlaneGeometry(1, 1.5);
    const windowMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x87CEEB,
      specular: 0xFFFFFF,
      shininess: 100,
    });

    // Create windows pattern
    for (let z = -13; z <= 13; z += 3) {
      for (let y = 2; y <= 12; y += 3) {
        // Front windows
        const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
        frontWindow.position.set(-10.01, y, z);
        scene.add(frontWindow);

        // Back windows
        const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
        backWindow.position.set(10.01, y, z);
        backWindow.rotation.y = Math.PI;
        scene.add(backWindow);
      }
    }

    // Create entrance
    const entranceGeometry = new THREE.BoxGeometry(5, 6, 2);
    const entranceMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
    entrance.position.set(0, 3, -15.1);
    scene.add(entrance);

    // Interactive spots
    const spots: InteractiveSpot[] = [
      {
        id: 'library',
        name: 'Medical Library',
        description: 'State-of-the-art medical library with digital resources and study areas',
        position: new THREE.Vector3(-8, 2, -10),
        icon: BookOpen,
      },
      {
        id: 'lab',
        name: 'Simulation Lab',
        description: 'Advanced medical simulation lab for hands-on training',
        position: new THREE.Vector3(8, 2, -5),
        icon: Microscope,
      },
      {
        id: 'computer-lab',
        name: 'Computer Lab',
        description: 'Modern computer lab with medical software and research tools',
        position: new THREE.Vector3(-8, 2, 5),
        icon: Laptop,
      },
      {
        id: 'lecture-hall',
        name: 'Main Lecture Hall',
        description: 'Spacious lecture hall with advanced presentation equipment',
        position: new THREE.Vector3(8, 2, 10),
        icon: Users2,
      },
    ];

    // Add interactive spot markers
    spots.forEach(spot => {
      const markerGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const markerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.2,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(spot.position);
      (marker as any).spotData = spot;
      scene.add(marker);
      spotsRef.current[spot.id] = marker as THREE.Mesh & { spotData?: InteractiveSpot };

      // Add pulsing animation
      const pulse = () => {
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
        marker.scale.set(scale, scale, scale);
      };

      // Store the pulse function for the animation loop
      (marker as any).pulse = pulse;
    });

    // Camera position
    camera.position.set(0, 10, 40);
    camera.lookAt(0, 0, 0);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.minDistance = 10;
    controls.maxDistance = 50;

    // Handle click events
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      const rect = canvasRef.current!.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(Object.values(spotsRef.current));

      if (intersects.length > 0) {
        const clickedSpot = (intersects[0].object as THREE.Mesh & { spotData?: InteractiveSpot }).spotData;
        if (clickedSpot) {
          setSelectedSpot(clickedSpot);
        }
      } else {
        setSelectedSpot(null);
      }
    };

    canvasRef.current.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Update all marker animations
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && (object as any).pulse) {
          (object as any).pulse();
        }
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeEventListener('click', handleClick);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Overlay UI */}
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-center">
          <Link
            to="/sonivale"
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all"
          >
            Back to SONIVALE
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-white">School of Nursing</h1>
          <div className="w-32"></div>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-xl">Loading Virtual Tour...</div>
          </div>
        )}

        {/* Info panel for selected spot */}
        {selectedSpot && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <selectedSpot.icon className="w-6 h-6" />
              <h2 className="text-xl font-bold">{selectedSpot.name}</h2>
            </div>
            <p className="text-gray-700">{selectedSpot.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
