export function buildHall(ctx) {
  const { T, sc, frame, bx } = ctx;

  frame("about", -4, 2.1, -5.62, 0, "greycard: About", "#2b1a12", 1.5, 2);
  frame("edu", 4, 2.1, -5.62, 0, "Education", "#3a2216", 1.3, 1.7);

  const wood = new T.MeshStandardMaterial({
    color: 0x24160f,
    roughness: 0.72,
  });
  const darkBrass = new T.MeshStandardMaterial({
    color: 0x8c7450,
    metalness: 0.73,
    roughness: 0.4,
  });
  const plaster = new T.MeshStandardMaterial({
    color: 0x827666,
    roughness: 0.95,
  });
  const fabric = new T.MeshStandardMaterial({
    color: 0x4b1720,
    roughness: 1,
  });

  // Wall trim
  for (const side of [-1, 1]) {
    const x = side * 6.76;

    bx(0.09, 0.27, 11.2, wood, x, 0.16, 0);
    bx(0.12, 0.1, 11.2, darkBrass, x, 1.28, 0);
    bx(0.1, 0.25, 11.2, plaster, x, 4.37, 0);

    [-4.4, -2.2, 2.2, 4.4].forEach((z) => {
      bx(0.08, 3.9, 0.2, wood, x, 2.25, z);
      bx(0.07, 0.025, 1.4, darkBrass, x - side * 0.05, 1.07, z);
    });
  }

  for (const z of [-5.76, 5.76]) {
    [-6.1, -1.8, 1.8, 6.1].forEach((x) => {
      bx(0.24, 3.9, 0.1, wood, x, 2.25, z);
    });

    bx(12.8, 0.22, 0.1, plaster, 0, 4.34, z);
  }

  // Burgundy floor runner
  const rug = new T.Mesh(new T.PlaneGeometry(3.2, 6.9), fabric);
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.018, 0.45);
  sc.add(rug);

  const rugBorder = new T.LineSegments(
    new T.EdgesGeometry(new T.PlaneGeometry(2.98, 6.66)),
    new T.LineBasicMaterial({ color: 0x927750 })
  );
  rugBorder.rotation.x = -Math.PI / 2;
  rugBorder.position.set(0, 0.024, 0.45);
  sc.add(rugBorder);

  // Shaded wall sconces
  for (const side of [-1, 1]) {
    for (const z of [-3.6, 3.6]) {
      const x = side * 6.55;

      bx(0.08, 0.4, 0.18, darkBrass, x, 2.45, z);
      bx(0.5, 0.045, 0.045, darkBrass, x - side * 0.24, 2.42, z);

      const shade = new T.Mesh(
        new T.CylinderGeometry(0.16, 0.22, 0.3, 12, 1, true),
        new T.MeshStandardMaterial({
          color: 0xc8b89a,
          roughness: 0.92,
          side: T.DoubleSide,
        })
      );
      shade.position.set(x - side * 0.48, 2.52, z);
      sc.add(shade);

      const light = new T.PointLight(0xffc58b, 0.65, 5.5, 2);
      light.position.set(x - side * 0.5, 2.45, z);
      sc.add(light);
    }
  }

  // Hanging chandelier
  const chandelier = new T.Group();

  const brass = new T.MeshStandardMaterial({
    color: 0x92764e,
    metalness: 0.82,
    roughness: 0.31,
  });
  const crystal = new T.MeshPhysicalMaterial({
    color: 0xe3ded2,
    metalness: 0,
    roughness: 0.13,
    transmission: 0.58,
    thickness: 0.25,
    ior: 1.46,
  });
  const candle = new T.MeshStandardMaterial({
    color: 0xf8d4a1,
    emissive: 0xffb760,
    emissiveIntensity: 0.75,
  });

  const rod = (radius, height, x, y, z, material = brass) => {
    const mesh = new T.Mesh(
      new T.CylinderGeometry(radius, radius, height, 10),
      material
    );
    mesh.position.set(x, y, z);
    chandelier.add(mesh);
  };

  rod(0.035, 0.75, 0, 4.2, 0);
  rod(0.18, 0.18, 0, 3.8, 0);

  [0.85, 1.35].forEach((radius, tier) => {
    const y = tier === 0 ? 3.62 : 3.88;

    const ring = new T.Mesh(
      new T.TorusGeometry(radius, 0.045, 8, 40),
      brass
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    chandelier.add(ring);

    const count = tier === 0 ? 10 : 14;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const drop = (tier === 0 ? 0.55 : 0.8) + (i % 3) * 0.09;

      rod(0.012, drop * 0.45, x, y - drop * 0.225, z);

      const prism = new T.Mesh(
        new T.CylinderGeometry(
          0.045,
          0.005,
          tier === 0 ? 0.28 : 0.38,
          6
        ),
        crystal
      );
      prism.position.set(x, y - drop * 0.68, z);
      prism.rotation.y = angle;
      chandelier.add(prism);

      if (tier === 1 && i % 3 === 0) {
        rod(0.055, 0.22, x, y + 0.12, z);

        const flame = new T.Mesh(
          new T.SphereGeometry(0.085, 10, 8),
          candle
        );
        flame.position.set(x, y + 0.29, z);
        chandelier.add(flame);
      }
    }
  });

  const centerDrop = new T.Mesh(
    new T.CylinderGeometry(0.12, 0.015, 0.55, 8),
    crystal
  );
  centerDrop.position.set(0, 2.9, 0);
  chandelier.add(centerDrop);

  const glow = new T.PointLight(0xffd2a3, 1.15, 10, 2);
  glow.position.set(0, 3.45, 0);
  chandelier.add(glow);

  sc.add(chandelier);
}