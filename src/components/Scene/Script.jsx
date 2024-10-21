import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as DAT from 'dat.gui'

//Global variables
let currentRef = null;
const floatPoints = [];
const gui = new DAT.GUI();

//Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8536b)

const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(-37, 27, 45);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 200);
renderer.outputEncoding = THREE.SRGBColorEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.physicallyCorrectLights = true;
renderer.toneMappingExposure = 1.4;

//OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// GLTFLOADER
const gltfLoader = new GLTFLoader();
gltfLoader.load('./Mapa.glb', (gltf) => {
  scene.add(gltf.scene);
})

// LIGHTS
const light1 = new THREE.DirectionalLight(0xffffff, 2.5);
light1.position.set(0,5,2);
scene.add(light1);

const al = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(al);

//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//Animate the scene
const animate = () => {

  // MOVE FLOAT POINTS
  for(const floatPoint of floatPoints) {
    const screenPositions = floatPoint.position.clone();
    screenPositions.project(camera);

    const positionX = screenPositions.x * currentRef.clientWidth * 0.5;
    const positionY = screenPositions.y * currentRef.clientHeight * -0.5;
    floatPoint.element.style.transform = `translate(${positionX}px, ${positionY}px)`;

  }

  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  gui.destroy();
  scene.traverse((object) => {
    // Limpiar geometrías
    if (object.geometry) {
      object.geometry.dispose();
    }

    // Limpiar materiales
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
      } else {
        object.material.dispose();
      }
    }

    // Limpiar texturas
    if (object.material && object.material.map) {
      object.material.map.dispose();
    }
  });
  currentRef.removeChild(renderer.domElement);
};

// FETCH FLOAT POINT ELEMENTS
export const fecthFloatPointsElements = () => {
  floatPoints.push({
    position: new THREE.Vector3(-14.39455, 7.2271, 8.43783),
    element: document.querySelector('.float-point-1')
  });
  floatPoints.push({
    position: new THREE.Vector3(11.741, 10.443, 1.033),
    element: document.querySelector('.float-point-2')
  })


/*   gui.add(floatPoints[0].position, 'x')
    .min(-10).max(20)
    .step(0.001)
    .name('posX')
  gui.add(floatPoints[0].position, 'y')
    .min(-10).max(20)
    .step(0.001)
    .name('posY')
  gui.add(floatPoints[0].position, 'z')
    .min(-10).max(20)
    .step(0.001)
    .name('posZ') */

  
}