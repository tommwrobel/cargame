
import { createScene, scene, renderer, camera, WIDTH, HEIGHT, container} from './word.js';
import { createLights } from './lights.js';
import { createSky, sky } from './sky.js';
import { createCar, updateCar, handleMouseClick, car } from './car.js';

window.addEventListener('load', init, false);

function init() {
	// set up the scene, the camera and the renderer
	createScene();

	// add the lights
	createLights(scene);

	// add the objects
	createSky(scene);
	createCar(scene);
	// createSky();

    //add the listener
	container.addEventListener('click', handleMouseClick, false);

	// start a loop
	loop();
}

function loop() {
	sky.mesh.rotation.y += .02;

    // update the car on each frame
	updateCar();

	requestAnimationFrame(loop);
	renderer.render(scene, camera);
}