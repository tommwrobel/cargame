import { Car } from "./car.js";
import { Background } from "./background.js";

const scene = new THREE.Scene();

// elements
const playerCar = Car();
scene.add(playerCar);

const bg = Background();
scene.add(bg);

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(100, -300, 400);
scene.add(directionalLight);

// camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;
const camera = new THREE.OrthographicCamera(
    cameraWidth / -2,
    cameraWidth / 2,
    cameraHeight / 2,
    cameraHeight / -2,
    0,
    1000
);
camera.position.set(200, -200, 300);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
animateScene();

document.addEventListener("keydown", event => {
    if(event.key == 'w') {
        playerCar.position.x -= 0.2;
        playerCar.rotation.y -= 0.1;
    }

    if(event.key == 's') {
        playerCar.position.x += 0.2;
        playerCar.rotation.y += 0.1;
    }
            
    if(event.key == 'a') {
        playerCar.position.y -= 0.2;
        playerCar.rotation.x += 0.1;
    }
                
    if(event.key == 'd') {
        playerCar.position.y += 0.2;
        playerCar.rotation.x -= 0.1;
    }
});

function animateScene() {
    requestAnimationFrame(animateScene);
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement);