import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const PORSCHE_MODEL = "/models/porsche_911.glb";

export function buildGarage(ctx) {
  const { T, sc, bx, mat, OB, frame } = ctx;

  const paint = mat(0x151518, 0.36, 0.12);
  const metal = mat(0x494344, 0.35, 0.55);

  bx(6.3, 0.12, 3.6, paint, 14, 0.06, 0);
  bx(6.45, 0.035, 3.75, metal, 14, 0.015, 0);
  OB.push([14, 0, 2.5]);

  const loader = new GLTFLoader();

  loader.load(
    PORSCHE_MODEL,
    (gltf) => {
      const car = gltf.scene;

      car.updateMatrixWorld(true);
      const box = new T.Box3().setFromObject(car);
      const size = box.getSize(new T.Vector3());
      const longestSide = Math.max(size.x, size.z);

      if (!Number.isFinite(longestSide) || longestSide === 0) {
        console.error("Porsche model has invalid dimensions.");
        return;
      }

      // Fit the model onto the showroom platform.
      car.scale.multiplyScalar(4.7 / longestSide);
      car.updateMatrixWorld(true);

      const fittedBox = new T.Box3().setFromObject(car);
      const center = fittedBox.getCenter(new T.Vector3());

      car.position.set(
        14 - center.x,
        0.12 - fittedBox.min.y,
        -center.z
      );

      car.traverse((part) => {
        if (part.isMesh) {
          part.castShadow = true;
          part.receiveShadow = true;
        }
      });

      sc.add(car);
    },
    undefined,
    (error) => {
      console.error(`Could not load ${PORSCHE_MODEL}`, error);
    }
  );

  const key = new T.SpotLight(0xffe9cf, 2.3, 18, 0.65, 0.65, 1.4);
  key.position.set(12, 4.35, 2.8);
  key.target.position.set(14, 0.8, 0);
  sc.add(key, key.target);

  const fill = new T.SpotLight(0xd1dcff, 1.2, 18, 0.8, 0.85, 1.6);
  fill.position.set(18, 3.9, -2.5);
  fill.target.position.set(14, 0.8, 0);
  sc.add(fill, fill.target);

  frame("gp1", 10, 2.1, -5.62, 0, "Project One", "#1a1a1d");
  frame("gp2", 14, 2.1, -5.62, 0, "Project Two", "#26262a");
  frame("gp3", 18, 2.1, -5.62, 0, "Project Three", "#1a1a1d");

  frame(
    "carcredit",
    19.5,
    1.45,
    5.62,
    Math.PI,
    "Model credit",
    "#171619",
    0.9,
    0.65
  );
}