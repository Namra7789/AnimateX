import React, { useState, useEffect, useRef  } from "react";
import { Canvas, useFrame} from "@react-three/fiber";
import { OrbitControls, Sphere, Cone, Icosahedron, Cylinder, Box  } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useMemo } from "react";
import { saveAs } from "file-saver";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { ReactMediaRecorder } from "react-media-recorder";
const shapes = [
  { type: "box", defaultColor: "#ff5733" },
  { type: "sphere", defaultColor: "#33ff57" },
  { type: "cone", defaultColor: "#3357ff" },
  { type: "torus", defaultColor: "#ff33a1" },
  { type: "cylinder", defaultColor: "#a133ff" }
];

const Shape = ({ type, color, rotationSpeed, rotationAxis }) => {
  const meshRef = React.useRef();

  useFrame(() => {
    if (meshRef.current) {
      if (rotationAxis.includes("x")) meshRef.current.rotation.x += rotationSpeed;
      if (rotationAxis.includes("y")) meshRef.current.rotation.y += rotationSpeed;
      if (rotationAxis.includes("z")) meshRef.current.rotation.z += rotationSpeed;
    }
  });

  switch (type) {
    case "box":
      return <mesh ref={meshRef}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={color} /></mesh>;
    case "sphere":
      return <mesh ref={meshRef}><sphereGeometry args={[0.7, 32, 32]} /><meshStandardMaterial color={color} /></mesh>;
    case "cone":
      return <mesh ref={meshRef}><coneGeometry args={[0.7, 1, 32]} /><meshStandardMaterial color={color} /></mesh>;
    case "torus":
      return <mesh ref={meshRef}><torusGeometry args={[0.6, 0.2, 16, 100]} /><meshStandardMaterial color={color} /></mesh>;
    case "cylinder":
      return <mesh ref={meshRef}><cylinderGeometry args={[0.5, 0.5, 1, 32]} /><meshStandardMaterial color={color} /></mesh>;
    default:
      return null;
  }
};

const HomePage = () => {
  const [selectedShape, setSelectedShape] = useState("box");
  const [color, setColor] = useState("#ff5733");
  const [rotationSpeed, setRotationSpeed] = useState(0.01);
  const [rotationAxis, setRotationAxis] = useState(["y"]);
  const videoRef = useRef(null);

  const toggleAxis = (axis) => {
    setRotationAxis((prev) =>
      prev.includes(axis) ? prev.filter((a) => a !== axis) : [...prev, axis]
    );
  };

  return (
    <div className="app-container" style={{ textAlign: "center", padding: "20px", background: "#121212", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#FFD700", marginBottom: "10px" }}>AnimateX: Text-to-Motion Studio</h1>
      <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "15px" }}>Customize your animation:</p>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
        {shapes.map((shape) => (
          <button
            key={shape.type}
            onClick={() => {
              setSelectedShape(shape.type);
              setColor(shape.defaultColor);
            }}
            style={{
              padding: "12px 20px",
              fontSize: "1rem",
              cursor: "pointer",
              background: selectedShape === shape.type ? "#FFD700" : "#444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              transition: "0.3s",
              fontWeight: "bold"
            }}
          >
            {shape.type.toUpperCase()}
          </button>
        ))}
      </div>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ marginBottom: "15px", padding: "5px", borderRadius: "5px" }}
      />
      
      <input
        type="range"
        min="0.001"
        max="0.05"
        step="0.001"
        value={rotationSpeed}
        onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
        style={{ marginLeft: "10px", width: "200px" }}
      />
      <span style={{ marginLeft: "10px", color: "#FFD700" }}>{rotationSpeed.toFixed(3)}</span>
      
      <div style={{ marginTop: "15px" }}>
        <label style={{ marginRight: "10px", color: "#FFD700" }}>Rotate Axis:</label>
        {["x", "y", "z"].map((axis) => (
          <label key={axis} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={rotationAxis.includes(axis)}
              onChange={() => toggleAxis(axis)}
            /> {axis.toUpperCase()}
          </label>
        ))}
      </div>
      
      <ReactMediaRecorder
        video
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <button onClick={startRecording} style={{ margin: "10px", padding: "10px", background: "#28a745", color: "#fff", borderRadius: "5px" }}>Start Recording</button>
            <button onClick={stopRecording} style={{ margin: "10px", padding: "10px", background: "#dc3545", color: "#fff", borderRadius: "5px" }}>Stop Recording</button>
            {mediaBlobUrl && <a href={mediaBlobUrl} download="animation.mp4">Download Video</a>}
          </div>
        )}
      />
      
      <Canvas style={{ height: "500px", background: "#222", marginTop: "20px", borderRadius: "10px" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={0.8} />
        <OrbitControls />
        <Shape type={selectedShape} color={color} rotationSpeed={rotationSpeed} rotationAxis={rotationAxis} />
      </Canvas>
    </div>
  );
};

export default HomePage;
