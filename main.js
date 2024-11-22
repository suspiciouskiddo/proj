import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);
let model, model2;
const loader = new GLTFLoader();

loader.load('public/donald_t.glb', function (gltf) {
  model = gltf.scene;
  gltf.scene.scale.set(11 * gltf.scene.scale.x, 11 * gltf.scene.scale.y, 11 * gltf.scene.scale.z);

  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);

});
const spaceTexture = new THREE.TextureLoader().load('public/aaaaa.jpg');
scene.background = spaceTexture;
const loader2 = new GLTFLoader();
loader2.load('public/mcdonalds_big_mac.glb', function (gltf) {
  model2 = gltf.scene;
  gltf.scene.scale.set(11 * gltf.scene.scale.x, 11 * gltf.scene.scale.y, 11 * gltf.scene.scale.z);
  gltf.scene.position.set(16, -5, 0);

  scene.add(gltf.scene);

}, undefined, function (error) {

  console.error(error);
})

const controls = new OrbitControls(camera, renderer.domElement);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function animate() {
  requestAnimationFrame(animate);

  model.rotation.z += 0.01;
  model.rotation.x += 0.01;
  model.rotation.y += 0.01;
  model2.rotation.y += 0.01;
  controls.update();

  renderer.render(scene, camera);
}

animate();