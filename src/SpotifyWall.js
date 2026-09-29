import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";

export function createSpotifyWall(camera) {
  const scene = new THREE.Scene();

  const renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const layer = renderer.domElement;
  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    zIndex: "4",
    pointerEvents: "none",
  });
  document.body.appendChild(layer);

  const panel = document.createElement("div");
  Object.assign(panel.style, {
    width: "400px",
    height: "560px",
    background: "#290b13",
    border: "8px solid #574333",
    borderRadius: "12px",
    overflow: "hidden",
    pointerEvents: "auto",
    boxSizing: "border-box",
  });

  const heading = document.createElement("div");
  heading.textContent = "Now playing";
  Object.assign(heading.style, {
    color: "#efe4cc",
    textAlign: "center",
    font: "24px Georgia",
    padding: "18px 0",
  });
  panel.appendChild(heading);

  const playerHost = document.createElement("div");
  panel.appendChild(playerHost);

  const wall = new CSS3DObject(panel);
  wall.position.set(-6.6, 1.9, -13);
  wall.rotation.y = Math.PI / 2;
  wall.scale.setScalar(0.004);
  scene.add(wall);

  let controller = null;
  let ready = false;
  let playRequested = false;
  let wasInListeningRoom = false;

  function requestPlay() {
    playRequested = true;

    if (ready && controller) {
      controller.play();
    }
  }

  function initializePlayer(api) {
    api.createController(
      playerHost,
      {
        width: 384,
        height: 480,
        uri: "spotify:playlist:1p96Ilaggxn6JlGkLEbw4y",
      },
      (embedController) => {
        controller = embedController;

        controller.addListener("ready", () => {
          ready = true;

          const iframe = panel.querySelector("iframe");
          if (iframe) {
            iframe.setAttribute(
              "allow",
              "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            );
          }

          if (playRequested) {
            controller.play();
          }
        });
      }
    );
  }

  // Initialize Spotify before the entrance button is clicked.
  if (window.mansionSpotifyAPI) {
    initializePlayer(window.mansionSpotifyAPI);
  } else {
    window.onSpotifyIframeApiReady = (api) => {
      window.mansionSpotifyAPI = api;
      initializePlayer(api);
    };

    if (!document.getElementById("spotify-iframe-api")) {
      const script = document.createElement("script");
      script.id = "spotify-iframe-api";
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.head.appendChild(script);
    }
  }

  // Capture the visitor's entrance click to attempt playback.
  const enterButton = document.getElementById("en");
  function playOnEntrance() {
    // The entrance hall is outside the listening room.
    // Start music using the Spotify screen once inside.
    }

    enterButton?.addEventListener("click", playOnEntrance);

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", resize);

  return {
    render() {
    const inListeningRoom =
        camera.position.x > -7 &&
        camera.position.x < 7 &&
        camera.position.z > -20 &&
        camera.position.z < -6;

    const overlayOpen =
        !document.getElementById("pn").hidden ||
        !document.getElementById("br").hidden;

    // Pause when leaving the room, including pending playback.
    if (!inListeningRoom) {
        playRequested = false;

        if (wasInListeningRoom && controller && ready) {
        controller.pause();
        }
    }

    wasInListeningRoom = inListeningRoom;

    layer.style.display =
        inListeningRoom && !overlayOpen ? "block" : "none";

    renderer.render(scene, camera);
    },
  };
}