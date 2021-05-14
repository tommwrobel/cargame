import { Colors } from './globals.js';

var container = document.getElementById('universe');
var WIDTH = container.getBoundingClientRect().width;
var HEIGHT = container.getBoundingClientRect().height;

var Car = function() {
	
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(25, 10, 10, 1, 1, 1);
	var matCockpit = new THREE.MeshPhongMaterial({ color:Colors.red, shading: THREE.FlatShading });
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
};

export var car;

export function createCar(scene){ 
	car = new Car(Colors);
    car.mesh.position.x -= 100;
	scene.add(car.mesh);
}

var mousePos = {
    x: 0,
    y: 0
};

export function updateCar(){
	var targetY = mousePos.y;

    // Move the car at each frame by adding a fraction of the remaining distance
	car.mesh.position.y += (targetY - car.mesh.position.y) * 0.1;

	//Rotate the car proportionally to the remaining distance
	car.mesh.rotation.z = (targetY - car.mesh.position.y) * 0.0128;
	car.mesh.rotation.x = (car.mesh.position.y - targetY) * 0.0064;
}

export function handleMouseClick(event) {
    let clickHeightPercentage = ((event.offsetY) / HEIGHT) * 100;

    if (clickHeightPercentage <= 50 && car.mesh.position.y <  40) {
        mousePos.y += 40;
    }

    if (clickHeightPercentage > 50 && car.mesh.position.y > -40) {
        mousePos.y -= 40;
    };
}