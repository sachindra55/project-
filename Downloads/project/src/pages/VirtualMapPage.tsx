import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Users, Map, BookOpen } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { communityData } from '../data/communityData';
import { CharacterProfile } from '../components/community/CharacterProfile';
import { setupLocationMarkers } from '../components/map/LocationMarker';
import { StorylineViewer } from '../components/storyline/StorylineViewer';

export const VirtualMapPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showStoryline, setShowStoryline] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedStoryline, setSelectedStoryline] = useState(communityData.storylines[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    let mounted = true;

    const initScene = async () => {
      try {
        if (!containerRef.current) {
          throw new Error('Container not found');
        }

        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87ceeb); // Sky blue
        sceneRef.current = scene;

        // Create camera
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0, 50, 50);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Add controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxPolarAngle = Math.PI / 2.1; // Prevent going below ground
        controls.minDistance = 10;
        controls.maxDistance = 100;

        // Create ground
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshPhongMaterial({
          color: 0x90EE90, // Light green
          side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light (sun)
        const sunLight = new THREE.DirectionalLight(0xffffff, 1);
        sunLight.position.set(50, 100, 50);
        sunLight.castShadow = true;
        scene.add(sunLight);

        // Add location markers
        setupLocationMarkers(scene, communityData.locations, (locationId) => {
          setSelectedLocation(locationId);
        });

        // Animation loop
        const animate = () => {
          if (!mounted) return;
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing scene:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize 3D scene');
        setIsLoading(false);
      }
    };

    initScene();

    // Cleanup
    return () => {
      mounted = false;
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-screen bg-gray-100">
      {/* 3D Map Container */}
      <div ref={containerRef} className="absolute inset-0">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="text-white text-xl">Loading Sonivale...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
            <div className="text-red-600 text-xl bg-white p-4 rounded-lg shadow-lg">
              {error}
            </div>
          </div>
        )}
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
        <Link
          to="/"
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>

        <div className="flex gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Info className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => setShowCharacters(!showCharacters)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Users className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => setShowStoryline(!showStoryline)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <BookOpen className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute top-20 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-2">About Sonivale</h2>
          <p className="text-gray-600">
            Sonivale is a semi-rural Australian community where you can explore real-world
            scenarios and learn about various aspects of community life, healthcare,
            education, and more.
          </p>
        </div>
      )}

      {/* Characters Panel */}
      {showCharacters && (
        <div className="absolute top-20 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Community Members</h2>
          <div className="space-y-4">
            {communityData.characters.map(character => (
              <CharacterProfile
                key={character.id}
                character={character}
                onInteract={(characterId) => {
                  const storyline = communityData.storylines.find(
                    s => s.characters.includes(characterId)
                  );
                  if (storyline) {
                    setSelectedStoryline(storyline);
                    setShowStoryline(true);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Storyline Panel */}
      {showStoryline && (
        <div className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Current Story</h2>
              <button
                onClick={() => setShowStoryline(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            <StorylineViewer
              storyline={selectedStoryline}
              onComplete={() => setShowStoryline(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualMapPage;
