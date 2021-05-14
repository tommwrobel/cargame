
import { createScene, scene, camera, container, renderer } from './word.js';
import { createLights } from './lights.js';
import { createSky, sky } from './sky.js';
import { createCar, updateCar, handleMouseClick, car } from './car.js';
import { createObject, updateObject, object } from './object.js';
import { checkCollision } from './collision.js';

window.addEventListener('load', init, false);

function init() {
	// set up the scene, the camera and the renderer
	createScene();

	// add the lights
	createLights(scene);

	// add the objects
	createSky(scene);
	createCar(scene);
    createObject(scene);

    //add the listener
	container.addEventListener('click', handleMouseClick, false);

	// start a loop
	loop();
}

function loop() {
	sky.mesh.rotation.y += .02;

    // update the car on each frame
	updateCar();
    updateObject(scene);

    if (checkCollision(car, object, scene)) {
        document.getElementById('points').innerHTML = parseInt(document.getElementById('points').innerHTML) + 10;
        console.log("KOLIZJA!");
    }

	requestAnimationFrame(loop);
	renderer.render(scene, camera);
}