
import { createScene, scene, camera, container, renderer } from './word.js';
import { createLights } from './lights.js';
import { createSky, sky } from './sky.js';
import { createPlayer, updatePlayer, handleMouseClick, checkCollisions } from './player.js';
import { createObject, updateObject, objects } from './objects.js';

var clock = new THREE.Clock(false);
var tt = 0.0;

window.addEventListener('load', init, false);

function init() {
	// set up the scene, the camera and the renderer
	createScene();

	// add the lights
	createLights(scene);

	// add the objects
	createSky(scene);
	createPlayer(scene);

    //add the listener
	container.addEventListener('click', handleMouseClick, false);

	// start a loop
	clock.start();
	loop();
}

function loop() {
	sky.mesh.rotation.y += .02;

    // update the car on each frame
	updatePlayer();
    updateObject(scene);
    checkCollisions(objects, scene);

	tt += clock.getDelta();
	if (tt > 1) {
		tt = 0.0;
		createObject(scene);
	}

	requestAnimationFrame(loop);
	renderer.render(scene, camera);
}