import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, ContactShadows } from "@react-three/drei";
import { prefersReduced } from "../ui";

const DAY = {
  bg: new THREE.Color("#BCE0C1"),
  fog: new THREE.Color("#C6E5C9"),
  amb: 0.85,
  sun: 1.35,
  sunColor: new THREE.Color("#FFE9C4"),
  cloudOp: 0.95,
  win: 0.05,
};
const NIGHT = {
  bg: new THREE.Color("#0C2117"),
  fog: new THREE.Color("#0C2117"),
  amb: 0.24,
  sun: 0.4,
  sunColor: new THREE.Color("#8FB3D9"),
  cloudOp: 0.16,
  win: 2.6,
};

function Rig({ night }: { night: boolean }) {
  const bgRef = useRef<THREE.Color>(null!);
  const fogRef = useRef<THREE.Fog>(null!);
  const amb = useRef<THREE.AmbientLight>(null!);
  const sun = useRef<THREE.DirectionalLight>(null!);
  const tDay = DAY;
  const tNight = NIGHT;

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 3);
    const T = night ? tNight : tDay;
    bgRef.current.lerp(T.bg, k);
    fogRef.current.color.lerp(T.fog, k);
    amb.current.intensity = THREE.MathUtils.lerp(amb.current.intensity, T.amb, k);
    sun.current.intensity = THREE.MathUtils.lerp(sun.current.intensity, T.sun, k);
    sun.current.color.lerp(T.sunColor, k);
  });

  return (
    <>
      <color ref={bgRef} attach="background" args={["#BCE0C1"]} />
      <fog ref={fogRef} attach="fog" args={["#C6E5C9", 11, 26]} />
      <ambientLight ref={amb} intensity={0.85} />
      <hemisphereLight args={["#DFF3DC", "#2E4A33", 0.5]} />
      <directionalLight
        ref={sun}
        position={[5, 7, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
    </>
  );
}

function Tree({
  p,
  s = 1,
  c = "#2F6B45",
  r = 0,
}: {
  p: [number, number, number];
  s?: number;
  c?: string;
  r?: number;
}) {
  return (
    <group position={p} scale={s} rotation={[0, r, 0]}>
      <mesh castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.42, 6]} />
        <meshStandardMaterial color="#6B4A2F" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.72, 0]}>
        <coneGeometry args={[0.44, 0.8, 7]} />
        <meshStandardMaterial color={c} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 1.24, 0]}>
        <coneGeometry args={[0.33, 0.66, 7]} />
        <meshStandardMaterial color={c} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 1.68, 0]}>
        <coneGeometry args={[0.22, 0.55, 7]} />
        <meshStandardMaterial color={c} roughness={0.85} />
      </mesh>
    </group>
  );
}

function Smoke({ night }: { night: boolean }) {
  const puffs = useRef<THREE.Mesh[]>([]);
  const reduced = useMemo(() => prefersReduced(), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    puffs.current.forEach((m, i) => {
      if (!m) return;
      if (reduced) {
        m.position.y = 2.15 + i * 0.28;
        m.scale.setScalar(0.1 + i * 0.05);
        return;
      }
      const p = ((t * 0.22 + i * 0.25) % 1 + 1) % 1;
      m.position.set(0.48 + Math.sin(p * 6 + i) * 0.07, 2.05 + p * 1.15, -0.28);
      m.scale.setScalar(0.07 + p * 0.16);
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.opacity = (1 - p) * (night ? 0.28 : 0.45);
    });
  });
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(el) => void (el && (puffs.current[i] = el))}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color="#E9EFE4" transparent opacity={0.4} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function House({ night }: { night: boolean }) {
  const winMat = useRef<THREE.MeshStandardMaterial>(null!);
  const reduced = useMemo(() => prefersReduced(), []);
  useFrame((_, dt) => {
    if (reduced) {
      winMat.current.emissiveIntensity = night ? 2.6 : 0.05;
      return;
    }
    const T = night ? NIGHT.win : DAY.win;
    winMat.current.emissiveIntensity = THREE.MathUtils.lerp(
      winMat.current.emissiveIntensity,
      T,
      Math.min(1, dt * 3)
    );
  });

  const win = (
    pos: [number, number, number],
    size: [number, number, number] = [0.3, 0.34, 0.05]
  ) => (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={winMat}
        color="#3A2E1C"
        emissive="#FFC861"
        emissiveIntensity={0.05}
        roughness={0.4}
      />
    </mesh>
  );

  return (
    <group position={[0.05, 0, -0.1]}>
      {/* сруб */}
      <mesh castShadow receiveShadow position={[0, 0.58, 0]}>
        <boxGeometry args={[1.7, 1.16, 1.4]} />
        <meshStandardMaterial color="#C9894B" roughness={0.8} />
      </mesh>
      {/* кровля-шатёр */}
      <mesh castShadow position={[0, 1.63, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.52, 0.98, 4]} />
        <meshStandardMaterial color="#27432F" roughness={0.75} />
      </mesh>
      {/* труба */}
      <mesh castShadow position={[0.48, 1.92, -0.28]}>
        <boxGeometry args={[0.24, 0.56, 0.24]} />
        <meshStandardMaterial color="#8A5A3A" roughness={0.9} />
      </mesh>
      <mesh position={[0.48, 2.22, -0.28]}>
        <boxGeometry args={[0.32, 0.07, 0.32]} />
        <meshStandardMaterial color="#5B3A22" roughness={0.9} />
      </mesh>
      {/* дверь */}
      <mesh position={[0.45, 0.4, 0.71]}>
        <boxGeometry args={[0.36, 0.66, 0.06]} />
        <meshStandardMaterial color="#5B3A22" roughness={0.8} />
      </mesh>
      {/* окна: фасад */}
      {win([-0.42, 0.62, 0.71])}
      {win([-0.42, 0.28, 0.71], [0.3, 0.22, 0.05])}
      {/* окна: торец */}
      {win([0.86, 0.6, 0.18], [0.05, 0.34, 0.3])}
      {win([0.86, 0.6, -0.32], [0.05, 0.34, 0.3])}
      {/* окна: противоположная сторона */}
      {win([-0.3, 0.6, -0.71], [0.5, 0.36, 0.05])}
      {/* терраса */}
      <mesh castShadow receiveShadow position={[0.05, 0.05, 1.15]}>
        <boxGeometry args={[2.1, 0.1, 0.75]} />
        <meshStandardMaterial color="#B27B49" roughness={0.9} />
      </mesh>
      {/* ступень */}
      <mesh position={[0.45, 0.03, 1.58]}>
        <boxGeometry args={[0.5, 0.07, 0.2]} />
        <meshStandardMaterial color="#8A6238" roughness={0.9} />
      </mesh>
      <Smoke night={night} />
    </group>
  );
}

function Clouds({ night }: { night: boolean }) {
  const g1 = useRef<THREE.Group>(null!);
  const g2 = useRef<THREE.Group>(null!);
  const mat1 = useRef<THREE.MeshStandardMaterial>(null!);
  const mat2 = useRef<THREE.MeshStandardMaterial>(null!);
  const reduced = useMemo(() => prefersReduced(), []);

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    const T = night ? NIGHT.cloudOp : DAY.cloudOp;
    [mat1, mat2].forEach((m) => {
      if (m.current)
        m.current.opacity = THREE.MathUtils.lerp(m.current.opacity, T, Math.min(1, dt * 2));
    });
    if (reduced) return;
    if (g1.current) g1.current.position.x = (((t * 0.24) % 11) + 11) % 11 - 5.5;
    if (g2.current) g2.current.position.x = -(((((t * 0.16 + 4) % 11) + 11) % 11) - 5.5);
  });

  const puffs = (m: React.RefObject<THREE.MeshStandardMaterial>) => (
    <>
      <mesh castShadow position={[0, 0, 0]}>
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshStandardMaterial ref={m} color="#F4F7EF" transparent opacity={0.95} roughness={1} />
      </mesh>
      <mesh position={[0.42, -0.08, 0.05]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color="#F4F7EF" transparent opacity={0.95} roughness={1} />
      </mesh>
      <mesh position={[-0.4, -0.06, -0.05]}>
        <sphereGeometry args={[0.27, 12, 12]} />
        <meshStandardMaterial color="#F4F7EF" transparent opacity={0.95} roughness={1} />
      </mesh>
    </>
  );

  return (
    <>
      <group ref={g1} position={[-3, 2.9, -1.4]}>
        {puffs(mat1)}
      </group>
      <group ref={g2} position={[2.5, 3.4, -2.2]} scale={0.8}>
        {puffs(mat2)}
      </group>
    </>
  );
}

function Fireflies() {
  const group = useRef<THREE.Group>(null!);
  const seeds = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        a: (i / 9) * Math.PI * 2 + 0.5,
        r: 1.6 + (i % 3) * 0.55,
        y: 0.4 + (i % 4) * 0.32,
      })),
    []
  );
  const reduced = useMemo(() => prefersReduced(), []);
  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((c, i) => {
      const s = seeds[i];
      c.position.set(
        Math.cos(s.a + t * 0.25) * s.r,
        s.y + Math.sin(t * 1.4 + i * 2) * 0.25,
        Math.sin(s.a + t * 0.25) * s.r
      );
      const sc = 0.7 + Math.sin(t * 2.6 + i) * 0.3;
      c.scale.setScalar(Math.max(0.2, sc));
    });
  });
  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} position={[Math.cos(s.a) * s.r, s.y, Math.sin(s.a) * s.r]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color="#FFD27A"
            emissive="#FFC24D"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Island({ night }: { night: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const reduced = useMemo(() => prefersReduced(), []);

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime();
    if (!reduced) {
      group.current.rotation.y += dt * 0.09;
      inner.current.position.y = Math.sin(t * 0.75) * 0.09;
    }
    // лёгкий параллакс от курсора
    const k = Math.min(1, dt * 4);
    inner.current.rotation.x = THREE.MathUtils.lerp(
      inner.current.rotation.x,
      -state.pointer.y * 0.09,
      k
    );
    inner.current.rotation.z = THREE.MathUtils.lerp(
      inner.current.rotation.z,
      state.pointer.x * 0.05,
      k
    );
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        {/* трава */}
        <mesh castShadow receiveShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[2.7, 2.75, 0.44, 28]} />
          <meshStandardMaterial color="#4C9258" roughness={0.95} />
        </mesh>
        {/* земля */}
        <mesh position={[0, -0.98, 0]}>
          <cylinderGeometry args={[2.72, 2.05, 1.1, 28]} />
          <meshStandardMaterial color="#6E4C30" roughness={1} />
        </mesh>
        {/* скальное дно */}
        <mesh position={[0, -2.05, 0]}>
          <cylinderGeometry args={[2.05, 0.35, 1.1, 28]} />
          <meshStandardMaterial color="#59422D" roughness={1} />
        </mesh>
        {/* дорожка */}
        <mesh receiveShadow position={[0.5, 0.005, 1.95]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.55, 0.04, 0.9]} />
          <meshStandardMaterial color="#A98F63" roughness={1} />
        </mesh>

        <House night={night} />

        <Tree p={[-1.95, 0, -0.7]} s={1.15} c="#2F6B45" r={0.4} />
        <Tree p={[1.9, 0, -1.05]} s={1.3} c="#28603D" r={2.1} />
        <Tree p={[-1.15, 0, -1.85]} s={0.9} c="#3B7D52" r={1.2} />
        <Tree p={[1.35, 0, -1.95]} s={1.0} c="#2F6B45" r={4.0} />
        <Tree p={[-2.15, 0, 0.75]} s={0.75} c="#3B7D52" r={3.3} />
        <Tree p={[2.15, 0, 0.7]} s={0.85} c="#28603D" r={0.9} />
        <Tree p={[0.2, 0, -2.3]} s={0.7} c="#356F4B" r={5.1} />

        {/* кусты */}
        {[
          [-0.9, 1.5],
          [1.4, 1.2],
          [-1.6, -1.5],
        ].map(([x, z], i) => (
          <mesh key={i} castShadow position={[x, 0.14, z]} scale={[1, 0.72, 1]}>
            <sphereGeometry args={[0.24, 10, 10]} />
            <meshStandardMaterial color="#5FA46B" roughness={1} />
          </mesh>
        ))}
        {/* камни */}
        {[
          [1.75, -0.02, 0.05, 0.17],
          [-2.3, -0.02, -0.2, 0.14],
          [0.9, -0.02, 2.1, 0.12],
        ].map(([x, y, z, s], i) => (
          <mesh key={i} castShadow position={[x, y, z]}>
            <icosahedronGeometry args={[s, 0]} />
            <meshStandardMaterial color="#828A7C" roughness={1} flatShading />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Scene3D({ night }: { night: boolean }) {
  const reduced = useMemo(() => prefersReduced(), []);
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [5.4, 3.4, 6.4], fov: 36 }}
      gl={{ antialias: true, alpha: false }}
    >
      <Rig night={night} />
      <Island night={night} />
      <Clouds night={night} />
      {night && <Fireflies />}
      <group visible={night}>
        <Stars
          radius={34}
          depth={22}
          count={1400}
          factor={3.2}
          saturation={0}
          fade
          speed={reduced ? 0 : 0.6}
        />
      </group>
      <ContactShadows position={[0, -3.1, 0]} opacity={0.4} scale={13} blur={3} far={5} color="#0A1A10" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.55}
        maxPolarAngle={1.42}
        enableDamping
        dampingFactor={0.06}
        autoRotate={!reduced}
        autoRotateSpeed={0.55}
      />
    </Canvas>
  );
}
