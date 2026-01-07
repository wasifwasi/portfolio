import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'React', 'JavaScript', 'HTML5', 'CSS3', 'Next.js',
  'Node.js', 'GitHub', 'Python', 'AI/ML', 'OpenCV',
  'TensorFlow', 'UI/UX', 'Tailwind', 'Three.js', 'Redux'
];

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = { fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  
  const ref = useRef();
  const [hovered, setHovered] = React.useState(false);

  // Animate the text color on hover
  useFrame(({ camera }) => {
    // Make text face the camera
    ref.current.quaternion.copy(camera.quaternion);
    
    // Smooth color transition
    ref.current.material.color.lerp(
      color.set(hovered ? '#fa5b35' : '#282c34'), 
      0.1
    );
  });

  return (
    <Text
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
      {...fontProps}
      children={children}
    />
  );
}

function Cloud({ radius = 20 }) {
  // Create a spherical distribution of words
  const words = useMemo(() => {
    return skills.map((skill, i) => {
        // Golden spiral distribution
        const p = new THREE.Vector3();
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        
        p.setFromSphericalCoords(radius, phi, theta);
        return { position: p, word: skill };
    });
  }, [radius]);

  const groupRef = useRef();
  
  useFrame((state, delta) => {
     // Rotate the whole cloud slowly
     groupRef.current.rotation.y += delta * 0.1;
     // Add a little wobble
     groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {words.map(({ position, word }, i) => (
        <Word key={i} position={position}>{word}</Word>
      ))}
    </group>
  )
}

const Skills3D = () => {
  return (
    <div className="skills-3d-container">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
        <fog attach="fog" args={['#202025', 0, 80]} />
        <Cloud radius={16} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Skills3D;
