import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { CameraController } from '../components/CameraController';

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  type: 'info' | 'navigation';
  targetLocation?: string;
}

interface TourLocation {
  id: string;
  name: string;
  description: string;
  image360: string;
  hotspots: Hotspot[];
  interactiveObjects?: {
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    color: string;
    name: string;
    description: string;
    type: 'portal';
    targetLocation: string;
  }[];
}

const tourLocations: TourLocation[] = [
  {
    id: 'hallway',
    name: 'Campus Hallway',
    description: 'Welcome to our modern nursing campus hallway. This central corridor connects various specialized learning areas and facilities.',
    image360: '/images/Sonivale Campus Hallway 360.png',
    hotspots: [
      {
        id: 'hallway-library',
        position: [300, 0, -300],
        title: 'Library Entrance',
        description: 'Enter our state-of-the-art library',
        type: 'navigation',
        targetLocation: 'library'
      },
      {
        id: 'hallway-lab',
        position: [-300, 0, 300],
        title: 'Clinical Lab',
        description: 'Enter the clinical simulation laboratory',
        type: 'navigation',
        targetLocation: 'lab1'
      },
      {
        id: 'hallway-info',
        position: [0, 100, -400],
        title: 'Information Board',
        description: 'Check out our latest campus updates and events',
        type: 'info'
      }
    ]
  },
  {
    id: 'library',
    name: 'Sonivale Library',
    description: 'Our state-of-the-art library provides students with access to extensive medical literature, research materials, and quiet study spaces.',
    image360: '/images/Sonivale Library 360.png',
    hotspots: [
      {
        id: 'library-exit',
        position: [-400, 0, 0],
        title: 'Exit to Hallway',
        description: 'Return to the main hallway',
        type: 'navigation',
        targetLocation: 'hallway'
      },
      {
        id: 'library-resources',
        position: [200, 50, -300],
        title: 'Study Resources',
        description: 'Access our collection of medical journals and textbooks',
        type: 'info'
      }
    ]
  },
  {
    id: 'lab1',
    name: 'Clinical Lab - Station 1',
    description: 'This is the first station of our clinical simulation laboratory, equipped with advanced medical equipment for hands-on training.',
    image360: '/images/clinical lab 360/Lab 1.jpg',
    hotspots: [
      {
        id: 'lab1-exit',
        position: [-400, 0, 0],
        title: 'Exit to Hallway',
        description: 'Return to the main hallway',
        type: 'navigation',
        targetLocation: 'hallway'
      },
      {
        id: 'lab1-next',
        position: [400, 0, 0],
        title: 'Next Station',
        description: 'Proceed to Station 2',
        type: 'navigation',
        targetLocation: 'lab2'
      },
      {
        id: 'lab1-equipment',
        position: [0, 100, -300],
        title: 'Medical Equipment',
        description: 'Learn about the medical equipment used in this station',
        type: 'info'
      }
    ],
    interactiveObjects: [
      {
        id: 'lab1-portal',
        position: [200, 0, 200],
        rotation: [0, 0, 0],
        scale: 1,
        color: 'blue',
        name: 'Portal to Lab 2',
        description: 'Enter the portal to proceed to Lab 2',
        type: 'portal',
        targetLocation: 'lab2'
      }
    ]
  },
  {
    id: 'lab2',
    name: 'Clinical Lab - Station 2',
    description: 'Station 2 features specialized equipment for vital signs monitoring and basic nursing procedures.',
    image360: '/images/clinical lab 360/Lab 2.jpg',
    hotspots: [
      {
        id: 'lab2-exit',
        position: [-400, 0, 0],
        title: 'Exit to Hallway',
        description: 'Return to the main hallway',
        type: 'navigation',
        targetLocation: 'hallway'
      },
      {
        id: 'lab2-prev',
        position: [-400, 0, 0],
        title: 'Previous Station',
        description: 'Return to Station 1',
        type: 'navigation',
        targetLocation: 'lab1'
      },
      {
        id: 'lab2-next',
        position: [400, 0, 0],
        title: 'Next Station',
        description: 'Proceed to Station 3',
        type: 'navigation',
        targetLocation: 'lab3'
      },
      {
        id: 'lab2-equipment',
        position: [0, 100, -300],
        title: 'Medical Equipment',
        description: 'Learn about the medical equipment used in this station',
        type: 'info'
      }
    ]
  },
  {
    id: 'lab3',
    name: 'Clinical Lab - Station 3',
    description: 'Station 3 is dedicated to advanced clinical procedures and emergency response training.',
    image360: '/images/clinical lab 360/Lab 3.jpg',
    hotspots: [
      {
        id: 'lab3-exit',
        position: [-400, 0, 0],
        title: 'Exit to Hallway',
        description: 'Return to the main hallway',
        type: 'navigation',
        targetLocation: 'hallway'
      },
      {
        id: 'lab3-prev',
        position: [-400, 0, 0],
        title: 'Previous Station',
        description: 'Return to Station 2',
        type: 'navigation',
        targetLocation: 'lab2'
      },
      {
        id: 'lab3-next',
        position: [400, 0, 0],
        title: 'Next Station',
        description: 'Proceed to Station 4',
        type: 'navigation',
        targetLocation: 'lab4'
      },
      {
        id: 'lab3-equipment',
        position: [0, 100, -300],
        title: 'Medical Equipment',
        description: 'Learn about the medical equipment used in this station',
        type: 'info'
      }
    ]
  },
  {
    id: 'lab4',
    name: 'Clinical Lab - Station 4',
    description: 'Station 4 contains specialized equipment for advanced patient care scenarios.',
    image360: '/images/clinical lab 360/Lab 4.jpg',
    hotspots: [
      {
        id: 'lab4-exit',
        position: [-400, 0, 0],
        title: 'Exit to Hallway',
        description: 'Return to the main hallway',
        type: 'navigation',
        targetLocation: 'hallway'
      },
      {
        id: 'lab4-prev',
        position: [-400, 0, 0],
        title: 'Previous Station',
        description: 'Return to Station 3',
        type: 'navigation',
        targetLocation: 'lab3'
      },
      {
        id: 'lab4-next',
        position: [400, 0, 0],
        title: 'Next Station',
        description: 'Proceed to Station 5',
        type: 'navigation',
        targetLocation: 'lab5'
      },
      {
        id: 'lab4-equipment',
        position: [0, 100, -300],
        title: 'Medical Equipment',
        description: 'Learn about the medical equipment used in this station',
        type: 'info'
      }
    ]
  },
  {
    id: 'lab5',
    name: 'Clinical Lab - Station 5',
    description: 'Station 5 is equipped for practicing complex medical procedures and team-based scenarios.',
    image360: '/images/clinical lab 360/Lab 5.jpg',
    hotspots: [
      {
        id: 'lab5-exit',
        position: [-400, 0, 0],
        title: 'Exit to Hallway',
        description: 'Return to the main hallway',
        type: 'navigation',
        targetLocation: 'hallway'
      },
      {
        id: 'lab5-prev',
        position: [-400, 0, 0],
        title: 'Previous Station',
        description: 'Return to Station 4',
        type: 'navigation',
        targetLocation: 'lab4'
      },
      {
        id: 'lab5-equipment',
        position: [0, 100, -300],
        title: 'Medical Equipment',
        description: 'Learn about the medical equipment used in this station',
        type: 'info'
      }
    ]
  }
];

// Add audio narration for each location
const audioNarrations = {
  hallway: '/audio/hallway-narration.mp3',
  library: '/audio/library-narration.mp3',
  lab1: '/audio/lab1-narration.mp3',
  lab2: '/audio/lab2-narration.mp3',
  lab3: '/audio/lab3-narration.mp3',
  lab4: '/audio/lab4-narration.mp3',
  lab5: '/audio/lab5-narration.mp3',
};

// Add guided tour paths
const guidedTours = {
  fullTour: {
    name: 'Complete Facility Tour',
    description: 'Visit all locations in our nursing simulation facility',
    path: ['hallway', 'library', 'lab1', 'lab2', 'lab3', 'lab4', 'lab5'],
  },
  labTour: {
    name: 'Clinical Labs Tour',
    description: 'Focus on our state-of-the-art clinical simulation labs',
    path: ['lab1', 'lab2', 'lab3', 'lab4', 'lab5'],
  },
  quickTour: {
    name: 'Quick Overview',
    description: 'A brief tour of our main facilities',
    path: ['hallway', 'library', 'lab1'],
  },
};

interface GalleryModal {
  title: string;
  images: string[];
}

function Hotspot({ position, title, description, onClick, type }: {
  position: [number, number, number];
  title: string;
  description: string;
  onClick: () => void;
  type: 'info' | 'navigation';
}) {
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <sphereGeometry args={[15, 16, 16]} />
      <meshBasicMaterial
        color={type === 'navigation' ? '#4f46e5' : '#10b981'}
        opacity={hovered ? 0.8 : 0.6}
        transparent
      />
      {hovered && (
        <Html center>
          <div className="bg-white p-2 rounded-lg shadow-lg text-sm w-48">
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-xs mt-1">{description}</p>
          </div>
        </Html>
      )}
    </mesh>
  );
}

function MiniMap({ currentLocation, hotspots, onLocationSelect }: {
  currentLocation: TourLocation;
  hotspots: Hotspot[];
  onLocationSelect: (locationId: string) => void;
}) {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 w-48">
      <h4 className="text-sm font-bold mb-2">You are here: {currentLocation.name}</h4>
      <div className="relative h-48 bg-gray-100 rounded">
        {/* Simple 2D representation of the space */}
        <div className="absolute inset-0">
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className={`absolute w-3 h-3 rounded-full cursor-pointer
                ${hotspot.type === 'navigation' ? 'bg-indigo-600' : 'bg-emerald-600'}`}
              style={{
                left: `${((hotspot.position[0] + 500) / 1000) * 100}%`,
                top: `${((hotspot.position[2] + 500) / 1000) * 100}%`,
              }}
              onClick={() => hotspot.targetLocation && onLocationSelect(hotspot.targetLocation)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Annotation({ position, text }: { position: [number, number, number]; text: string }) {
  const { camera } = useThree();
  const textRef = useRef<any>();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group position={position}>
      <Text
        ref={textRef}
        fontSize={12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={2}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  );
}

function InteractiveObject({ position, scale = 1, onClick }: {
  position: [number, number, number];
  scale?: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.setScalar(scale * (1 + Math.sin(state.clock.elapsedTime * 4) * 0.1));
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, scale]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#ffbf69" />
    </mesh>
  );
}

function Panorama({ image, hotspots, onHotspotClick, showAnnotations }: { 
  image: string; 
  hotspots: Hotspot[];
  onHotspotClick: (hotspot: Hotspot) => void;
  showAnnotations: boolean;
}) {
  const texture = useTexture(image);
  texture.flipY = false;
  texture.mapping = THREE.EquirectangularReflectionMapping;
  
  return (
    <>
      <mesh scale={[-1, -1, 1]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          title={hotspot.title}
          description={hotspot.description}
          type={hotspot.type}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
      {showAnnotations && (
        <>
          <Annotation position={[0, 100, -300]} text="Medical Equipment" />
          <Annotation position={[200, 50, -300]} text="Study Resources" />
        </>
      )}
    </>
  );
}

function CameraSetup({ cameraRotation }: { cameraRotation: { x: number; y: number } }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0.1, 0, 0);
    camera.rotation.set(cameraRotation.x, cameraRotation.y, 0);
  }, [camera, cameraRotation]);

  return null;
}

export function VirtualTourPage() {
  // Core states
  const [selectedLocation, setSelectedLocation] = useState<TourLocation>(tourLocations[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Feature states
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string; description: string } | null>(null);
  const [galleryModal, setGalleryModal] = useState<GalleryModal | null>(null);
  const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(0);

  // Tour states
  const [currentTour, setCurrentTour] = useState<string | null>(null);
  const [tourStep, setTourStep] = useState(0);

  // Refs
  const viewerRef = useRef<HTMLDivElement>(null);
  const orbitControlsRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle image loading
  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);

    const image = new Image();
    image.src = selectedLocation.image360;

    const handleLoad = () => {
      console.log('Image loaded successfully:', selectedLocation.image360);
      setIsLoading(false);
    };

    const handleError = () => {
      console.error('Failed to load image:', selectedLocation.image360);
      setLoadError('Failed to load panorama image. Please try again.');
      setIsLoading(false);
    };

    image.onload = handleLoad;
    image.onerror = handleError;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [selectedLocation]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!orbitControlsRef.current) return;

      // Prevent default arrow key scrolling
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

      const rotationSpeed = 0.3; // Increased rotation speed
      const dampingFactor = 0.05; // Added damping for smoother movement

      switch (e.key) {
        case 'ArrowLeft':
          orbitControlsRef.current.rotateLeft(rotationSpeed);
          orbitControlsRef.current.update();
          break;
        case 'ArrowRight':
          orbitControlsRef.current.rotateLeft(-rotationSpeed);
          orbitControlsRef.current.update();
          break;
        case 'ArrowUp':
          orbitControlsRef.current.rotateUp(rotationSpeed);
          orbitControlsRef.current.update();
          break;
        case 'ArrowDown':
          orbitControlsRef.current.rotateUp(-rotationSpeed);
          orbitControlsRef.current.update();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          if (galleryModal) {
            setGalleryModal(null);
          }
          if (infoModal) {
            setInfoModal(null);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryModal, infoModal]);

  // Handle guided tour
  useEffect(() => {
    if (currentTour && guidedTours[currentTour as keyof typeof guidedTours]) {
      const tour = guidedTours[currentTour as keyof typeof guidedTours];
      const currentLocationId = tour.path[tourStep];
      const location = tourLocations.find(loc => loc.id === currentLocationId);
      if (location) {
        setSelectedLocation(location);
      }
    }
  }, [currentTour, tourStep]);

  // Handle audio narration
  useEffect(() => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.src = audioNarrations[selectedLocation.id as keyof typeof audioNarrations];
      audioRef.current.play();
    }
  }, [selectedLocation, audioEnabled]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Handle hotspot clicks
  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.type === 'navigation' && hotspot.targetLocation) {
      const newLocation = tourLocations.find(loc => loc.id === hotspot.targetLocation);
      if (newLocation) {
        setSelectedLocation(newLocation);
      }
    } else if (hotspot.type === 'info') {
      if (hotspot.id.includes('equipment')) {
        setGalleryModal({
          title: 'Medical Equipment Gallery',
          images: clinicalLabEquipment.map(equipment => equipment.image)
        });
      } else {
        setInfoModal({ title: hotspot.title, description: hotspot.description });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Audio Element */}
      <audio ref={audioRef} className="hidden" />

      {/* Control Panel */}
      <div className="fixed top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-3 py-1 rounded ${
                audioEnabled ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {audioEnabled ? 'Mute Audio' : 'Enable Audio'}
            </button>
            <button
              onClick={() => setShowMiniMap(!showMiniMap)}
              className={`px-3 py-1 rounded ${
                showMiniMap ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {showMiniMap ? 'Hide Map' : 'Show Map'}
            </button>
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`px-3 py-1 rounded ${
                showAnnotations ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {showAnnotations ? 'Hide Labels' : 'Show Labels'}
            </button>
          </div>
        </div>
      </div>

      {/* Mini Map */}
      {showMiniMap && (
        <div className="fixed bottom-4 right-4 z-10">
          <MiniMap
            currentLocation={selectedLocation}
            hotspots={selectedLocation.hotspots}
            onLocationSelect={(locationId) => {
              const location = tourLocations.find(loc => loc.id === locationId);
              if (location) {
                setSelectedLocation(location);
              }
            }}
          />
        </div>
      )}

      {/* Main Viewer */}
      <div 
        ref={viewerRef}
        className={`relative ${isFullscreen ? 'h-screen w-screen' : 'h-[600px]'}`}
      >
        {!loadError ? (
          <Canvas 
            camera={{ position: [0, 0, 0], fov: 75 }}
            style={{ background: '#000' }}
          >
            <CameraController 
              moveSpeed={0.5} 
              mouseSensitivity={0.002}
              interactiveObjects={selectedLocation.interactiveObjects}
              onPortalEnter={(targetLocation) => {
                const newLocation = tourLocations.find(loc => loc.id === targetLocation);
                if (newLocation) {
                  setIsLoading(true);
                  setTimeout(() => {
                    setSelectedLocation(newLocation);
                  }, 500);
                }
              }}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <Panorama 
                image={selectedLocation.image360} 
                hotspots={selectedLocation.hotspots}
                onHotspotClick={handleHotspotClick}
                showAnnotations={showAnnotations}
              />
              
              {/* Interactive Objects */}
              {selectedLocation.interactiveObjects?.map((obj) => (
                <InteractiveObject
                  key={obj.id}
                  position={obj.position}
                  rotation={obj.rotation}
                  scale={obj.scale}
                  color={obj.type === 'portal' ? '#2196f3' : obj.color} // Make portals blue
                  name={obj.name}
                  description={obj.description}
                  type={obj.type}
                  animate={true}
                />
              ))}
            </Suspense>
          </Canvas>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-white text-center p-4">
              <div className="text-xl mb-2">{loadError}</div>
              <button 
                onClick={() => {
                  setLoadError(null);
                  setIsLoading(true);
                  const image = new Image();
                  image.src = selectedLocation.image360;
                  image.onload = () => setIsLoading(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-2"></div>
              <div className="text-white text-lg">Loading panorama...</div>
            </div>
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="bg-black bg-opacity-75 text-white px-3 py-2 rounded">
            <div className="flex flex-col space-y-2">
              <div className="font-bold mb-1">Controls:</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono">W A S D</span> Move around
                </div>
                <div>
                  <span className="font-mono">SHIFT</span> Sprint
                </div>
                <div>
                  <span className="font-mono">MOUSE</span> Look around
                </div>
                <div>
                  <span className="font-mono">CLICK</span> Lock mouse
                </div>
                <div>
                  <span className="font-mono">ESC</span> Release mouse
                </div>
                <div>
                  <span className="font-mono">F</span> Fullscreen
                </div>
              </div>
              <div className="text-sm text-blue-300 mt-2">
                Get close to blue portals to automatically transition to new locations
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Click anywhere to start looking around
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded hover:bg-opacity-90 transition-opacity"
        >
          {isFullscreen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h6m-6 0v6m6-6v6m4-12H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 16l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>
      </div>

      {/* Gallery Modal */}
      {galleryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="max-w-7xl mx-auto p-4 w-full">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{galleryModal.title}</h3>
                <button
                  onClick={() => setGalleryModal(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto p-4">
                {clinicalLabEquipment.map((equipment, index) => (
                  <div 
                    key={index}
                    className={`relative group bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ${
                      index === selectedEquipmentIndex ? 'ring-2 ring-indigo-600 scale-105' : ''
                    }`}
                  >
                    <img
                      src={equipment.image}
                      alt={equipment.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{equipment.name}</h4>
                      <p className="text-sm text-gray-600">{equipment.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {infoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{infoModal.title}</h3>
            <p className="text-gray-600 mb-4">{infoModal.description}</p>
            <button
              onClick={() => setInfoModal(null)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const clinicalLabEquipment = [
  {
    image: '/images/clinical lab/Aseptic Dressing Trolley.jpg',
    name: 'Aseptic Dressing Trolley',
    description: 'Used for sterile wound dressing procedures'
  },
  {
    image: '/images/clinical lab/Blood Glucose Trolley.jpg',
    name: 'Blood Glucose Trolley',
    description: 'Equipment for blood glucose monitoring'
  },
  {
    image: '/images/clinical lab/Drud Cupboard.jpg',
    name: 'Drug Cupboard',
    description: 'Secure storage for medications'
  },
  {
    image: '/images/clinical lab/HDU table.jpg',
    name: 'HDU Table',
    description: 'High Dependency Unit equipment table'
  },
  {
    image: '/images/clinical lab/Inkection Table.jpg',
    name: 'Injection Table',
    description: 'Setup for injection practice and procedures'
  },
  {
    image: '/images/clinical lab/NG Tube mannikin.jpg',
    name: 'NG Tube Mannequin',
    description: 'Training mannequin for nasogastric tube insertion'
  },
  {
    image: '/images/clinical lab/Nurses Station.jpg',
    name: 'Nurses Station',
    description: 'Central command center for nursing staff'
  },
  {
    image: '/images/clinical lab/Ortho Patient.jpg',
    name: 'Orthopedic Patient Simulation',
    description: 'Setup for orthopedic care training'
  },
  {
    image: '/images/clinical lab/PPE equipment.jpg',
    name: 'PPE Equipment',
    description: 'Personal Protective Equipment station'
  },
  {
    image: '/images/clinical lab/Respiratory Table.jpg',
    name: 'Respiratory Table',
    description: 'Equipment for respiratory care procedures'
  },
  {
    image: '/images/clinical lab/Suture and Staple Trolley.jpg',
    name: 'Suture and Staple Trolley',
    description: 'Equipment for wound closure practice'
  },
  {
    image: '/images/clinical lab/Syringe Driver.jpg',
    name: 'Syringe Driver',
    description: 'Automated medication delivery system'
  },
  {
    image: '/images/clinical lab/Vital Signs Table.jpg',
    name: 'Vital Signs Table',
    description: 'Equipment for monitoring patient vital signs'
  },
  {
    image: '/images/clinical lab/Wound Trolley.jpg',
    name: 'Wound Care Trolley',
    description: 'Specialized equipment for wound management'
  }
];
