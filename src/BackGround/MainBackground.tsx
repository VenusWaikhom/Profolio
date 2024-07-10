import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Edges } from "@react-three/drei";
import { Physics, useCompoundBody, useCylinder } from "@react-three/cannon";
import { LayerMaterial, Depth, Fresnel } from "lamina";
import useMedia from "use-media";
import "./MainBackground.css";

const vec = new THREE.Vector3();
const cylinder = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 3);

interface MainProps {
  amount?: number;
}

export const MainBackground: React.FC<MainProps> = ({ amount = 12 }) => (
  <div className="Background">
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
      <Physics gravity={[0, 1, 0]}>
        {Array.from({ length: amount }, (_, i) => {
          const El = i % 2 ? Pmndrs : Vercel;
          return (
            <El
              key={i}
              mass={4}
              angularDamping={0.4}
              linearDamping={0.8}
              position={[Math.random(), Math.random(), Math.random()]}
            />
          );
        })}
        <Cursor
          mass={15}
          angularDamping={0.5}
          linearDamping={0.5}
          position={[0, 0, 10]}
        />
      </Physics>
    </Canvas>
  </div>
);

interface VercelProps {
  mass?: number;
  angularDamping?: number;
  linearDamping?: number;
  position?: [number, number, number];
}

function Vercel(props: VercelProps) {
  const ispone = useMedia({ maxWidth: 480 });
  const istablet = useMedia({ minWidth: 482, maxWidth: 766 });

  const [ref, api] = useCylinder<THREE.Mesh>(() => ({
    args: [0.6, 0.6, 0.5, 3],
    ...props,
  }));

  useFrame(() =>
    api.applyForce(
      vec
        .setFromMatrixPosition(ref.current!.matrix)
        .normalize()
        .multiplyScalar(-40)
        .toArray(),
      [0, 0, 0]
    )
  );

  const edgesGeometry = new THREE.EdgesGeometry(cylinder);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: "black",
    linewidth: 2,
  });

  return (
    <mesh
      ref={ref}
      geometry={cylinder}
      scale={ispone ? [0.5, 0.5, 0.5] : istablet ? [0.8, 0.8, 0.8] : [1, 1, 1]}
      position={[-0.02, -0.5, 0.022]}
    >
      <LayerMaterial toneMapped={false}>
        <Depth
          colorA="#FFFFFF"
          colorB="#FFFFFF"
          alpha={1}
          mode="normal"
          near={0.5}
          far={1}
          origin={[0, 0, 0]}
        />
      </LayerMaterial>
      <lineSegments geometry={edgesGeometry} material={edgesMaterial} />
    </mesh>
  );
}

interface PmndrsProps {
  mass?: number;
  angularDamping?: number;
  linearDamping?: number;
  position?: [number, number, number];
}

function Pmndrs(props: PmndrsProps) {
  const ispone = useMedia({ maxWidth: 480 });
  const istablet = useMedia({ minWidth: 482, maxWidth: 766 });

  const { nodes } = useGLTF("/pmndrs.glb") as unknown as {
    nodes: { logo: THREE.Mesh };
  };
  const [ref, api] = useCompoundBody<THREE.Group>(() => ({
    ...props,
    shapes: [
      { type: "Box", args: [0.65, 0.65, 0.5], position: [0.18, 0.18, 0] },
      { type: "Box", args: [0.3, 0.3, 0.5], position: [-0.35, 0, 0] },
      { type: "Box", args: [0.3, 0.3, 0.5], position: [0, -0.35, 0] },
    ],
  }));

  useFrame(() =>
    api.applyForce(
      vec
        .setFromMatrixPosition(ref.current!.matrix)
        .normalize()
        .multiplyScalar(-40)
        .toArray(),
      [0, 0, 0]
    )
  );

  const edgesGeometry = new THREE.EdgesGeometry(
    (nodes.logo as THREE.Mesh).geometry
  );
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: "black",
    linewidth: 2,
  });

  return (
    <group ref={ref}>
      <mesh
        scale={
          ispone
            ? [0.1, 0.1, 0.7]
            : istablet
            ? [0.15, 0.15, 0.9]
            : [0.188, 0.188, 0.97]
        }
        position={[-0.02, -0.5, 0.022]}
        geometry={(nodes.logo as THREE.Mesh).geometry}
      >
        <LayerMaterial toneMapped={false}>
          <Depth
            colorA="white"
            colorB="white"
            alpha={1}
            mode="normal"
            near={0.5}
            far={1}
            origin={[0, 0, 0]}
          />
        </LayerMaterial>
        <lineSegments geometry={edgesGeometry} material={edgesMaterial} />
      </mesh>
    </group>
  );
}

interface CursorProps {
  speed?: number;
  gradient?: number;
  mass?: number;
  angularDamping?: number;
  linearDamping?: number;
  position?: [number, number, number];
}

function Cursor({ speed = 10, gradient = 0.7, ...props }: CursorProps) {
  const ispone = useMedia({ maxWidth: 480 });
  const istablet = useMedia({ minWidth: 482, maxWidth: 766 });

  const { nodes } = useGLTF("/cursor.glb") as unknown as {
    nodes: { Cube: THREE.Mesh };
  };
  const viewport = useThree((state) => state.viewport);
  const [ref, api] = useCompoundBody<THREE.Group>(() => ({
    ...props,
    shapes: [
      {
        type: "Cylinder",
        args: [0.6, 0.6, 0.5, 3],
        position: [0, 0.2, 0],
        rotation: [Math.PI / 2, Math.PI, 0],
      },
      { type: "Box", args: [0.25, 1, 0.3], position: [0, -0.45, 0] },
    ],
  }));

  useFrame((state) => {
    vec.setFromMatrixPosition(ref.current!.matrix);
    api.velocity.set(
      ((state.mouse.x * viewport.width) / 2 - vec.x) * speed,
      ((state.mouse.y * viewport.height) / 2 - vec.y) * speed,
      -vec.z
    );
  });

  return (
    <group ref={ref}>
      <mesh
        scale={
          ispone ? [0.3, 0.5, 0.3] : istablet ? [0.4, 0.7, 0.4] : [0.5, 1, 0.55]
        }
        rotation={[0, Math.PI / 2, 0]}
        geometry={(nodes.Cube as THREE.Mesh).geometry}
      >
        <LayerMaterial toneMapped={false}>
          <Depth
            colorA="#ff0080"
            colorB="black"
            alpha={1}
            mode="normal"
            near={0.5 * gradient}
            far={0.5}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA="blue"
            colorB="#f7b955"
            alpha={1}
            mode="add"
            near={2 * gradient}
            far={2}
            origin={[1, 1, 1]}
          />
          <Depth
            colorA="green"
            colorB="#f7b955"
            alpha={1}
            mode="add"
            near={3 * gradient}
            far={3}
            origin={[-1, -1, -1]}
          />
          <Depth
            colorA="white"
            colorB="red"
            alpha={1}
            mode="overlay"
            near={1.5 * gradient}
            far={1.5}
            origin={[1, -1, -1]}
          />
          <Fresnel
            mode="add"
            color="white"
            intensity={0.75}
            power={2}
            bias={0.05}
          />
        </LayerMaterial>
        <Edges scale={1.002} color="white" />
      </mesh>
    </group>
  );
}

export default MainBackground;
