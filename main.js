import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Think of a scene like a container
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;
camera.position.x = -50;

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
pointLight.intensity = 8;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Stars
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load(
  "53404881117_bccc261c09_b.jpg"
);
spaceTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = spaceTexture;

// avatar
const denTexture = new THREE.TextureLoader().load("dennis_avatar.png");
denTexture.colorSpace = THREE.SRGBColorSpace;
const denCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: denTexture })
);

scene.add(denCube);

// moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace;

const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

moon.position.x = -10;
moon.position.y = 10;
moon.position.z = 30;

scene.add(moon);

// Scroll Animation
document.body.onscroll = moveCamera;

// Animation Loop
animate();

// functions

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // denCube.rotation.y += 0.01;

  // moon.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 12, 12);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  denCube.rotation.y += 0.01;
  denCube.rotation.z += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.01;
  camera.position.z = t * -0.01;

  camera.rotation.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  camera.rotation.z = t * -0.0002;
}
