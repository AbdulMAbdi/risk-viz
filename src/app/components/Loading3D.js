import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

export default function Loading3D({ position = [0, 0, 5] }) {
  const ref1 = useRef();
  const ref2 = useRef();
  useFrame((state, delta) => {
    if (ref1 && ref1.current && ref2 && ref2.current) {
      ref1.current.rotation.set(
        ref1.current.rotation.x + delta * 1.2,
        ref1.current.rotation.y + delta,
        ref1.current.rotation.z + delta * 0.8
      );
      ref2.current.rotation.set(
        ref2.current.rotation.x + delta * 1.2,
        ref2.current.rotation.y + delta,
        ref2.current.rotation.z + delta * 0.8
      );
    }
  });
  return (
    <>
      <Box ref={ref1} position={[position[0], position[1], -position[2]]}>
        <meshBasicMaterial attach="material" color="#FFFFFF" wireframe={true} />
      </Box>
      <Box ref={ref2} position={[position[0], position[1], position[2]]}>
        <meshBasicMaterial attach="material" color="#FFFFFF" wireframe={true} />
      </Box>
    </>
  );
}
