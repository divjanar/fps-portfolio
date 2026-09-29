import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function buildListening(ctx) {
  const { T, sc, bx, mat, OB, reg, lab } = ctx;

  // mansion.js expects this object for its animation loop.
  const rec = new T.Group();

  const booth = new T.Group();
  booth.position.set(0, 0, -13);
  sc.add(booth);

  const loader = new GLTFLoader();

  loader.load(
    `${import.meta.env.BASE_URL}models/dj_table.glb`,
    (gltf) => {
      const model = gltf.scene;

      // Use Math.PI if the table faces backward.
      model.rotation.y = 0;
      model.updateMatrixWorld(true);

      const box = new T.Box3().setFromObject(model);
      const size = box.getSize(new T.Vector3());

      if (
        !Number.isFinite(size.x + size.y + size.z) ||
        Math.max(size.x, size.y, size.z) === 0
      ) {
        console.error("DJ table has invalid dimensions.");
        return;
      }

      const scale = Math.min(
        5 / Math.max(size.x, 0.001),
        2.5 / Math.max(size.y, 0.001),
        3 / Math.max(size.z, 0.001)
      );

      model.scale.multiplyScalar(scale);
      model.updateMatrixWorld(true);

      const fittedBox = new T.Box3().setFromObject(model);
      const center = fittedBox.getCenter(new T.Vector3());
      const fittedSize = fittedBox.getSize(new T.Vector3());

      model.position.x -= center.x;
      model.position.y -= fittedBox.min.y;
      model.position.z -= center.z;

      booth.add(model);
      reg("airdj", model);

      OB.push([
        0,
        -13,
        Math.max(fittedSize.x, fittedSize.z) / 2,
      ]);
    },
    undefined,
    (error) => {
      console.error(
        "Could not load /models/dj_table.glb. " +
          "Check public/models/dj_table.glb.",
        error
      );
    }
  );

  // Clickable Air DJ plaque
  const plaque = bx(
    1.2,
    0.65,
    0.04,
    new T.MeshBasicMaterial({
      map: lab("AIR DJ", "#5a0f1e", 384, 208),
    }),
    3.5,
    1.5,
    -13
  );
  reg("airdj", plaque);

  // Warm lighting for the DJ table
  const spotlight = new T.SpotLight(
    0xffe4c4,
    3,
    18,
    0.75,
    0.7,
    1.5
  );
  spotlight.position.set(-2, 4.1, -10);
  spotlight.target.position.set(0, 1, -13);
  sc.add(spotlight, spotlight.target);

  const fillLight = new T.PointLight(0xffb8a0, 1.1, 8, 2);
  fillLight.position.set(2.5, 2.5, -14.5);
  sc.add(fillLight);

  // SpotifyWall.js now creates the Now Playing screen.

  // Decorative animated visualizer
  const bars = [];

  for (let i = 0; i < 20; i++) {
    const bar = bx(
      0.22,
      1,
      0.1,
      mat(0x3a0710, 0.4, 0, {
        emissive: 0xff2a3a,
        emissiveIntensity: 0.6,
      }),
      -3.8 + i * 0.4,
      0.5,
      -19.6
    );
    bars.push(bar);
  }

  return { rec, bars };
}