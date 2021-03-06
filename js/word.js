import { DataUtils } from './three.module.js';
import * as Utils from './utils.js';

export var 
	scene, camera, fieldOfView,
	nearPlane, farPlane, renderer, container;

export function createScene() {
	// Create the scene
	scene = new THREE.Scene();

	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
	
	// Create the camera
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 10000;
	// camera = new THREE.OrthographicCamera(
	// 	-Utils.Edges.rightX,
	// 	Utils.Edges.rightX,
	// 	Utils.Edges.topY,
	// 	-Utils.Edges.topY,
	// 	nearPlane,
	// 	farPlane
	// )
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		Utils.aspectRatio,
		nearPlane,
		farPlane
		);
	
	// Set the position of the camera
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 200;

	// Creating lights
	let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
	let shadowLight = new THREE.DirectionalLight(0xffffff, .9);

	shadowLight.position.set(150, -100, 350);
	
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
	
	// Create the renderer
	renderer = new THREE.WebGLRenderer({ 
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true, 

		// Activate the anti-aliasing; this is less performant,
		// but, as our project is low-poly based, it should be fine :)
		antialias: true 
	});

	// Define the size of the renderer; in this case,
	// it will fill the entire screen
	renderer.setSize(Utils.Dimensions.width, Utils.Dimensions.height);
	
	// Enable shadow rendering
	renderer.shadowMap.enabled = true;
	
	// Add the DOM element of the renderer to the 
	// container we created in the HTML
	container = document.getElementById('universe');
	container.appendChild(renderer.domElement);

	return scene;
}