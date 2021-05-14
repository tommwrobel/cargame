import { Center, Colors } from './global.js';

var container = document.getElementById('universe');
var WIDTH = container.getBoundingClientRect().width;
var HEIGHT = container.getBoundingClientRect().height;
var rotationUp = true;
var rotationLeft = true;

var Car = function() {
	
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(100, 50, 50, 1, 1, 1);
	var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
};

export var car;

export function createCar(scene){ 
	car = new Car(Colors);
	car.mesh.scale.set( .25, .25, .25);
	car.mesh.position.y = Center.y;
	car.mesh.position.x = -80;
	scene.add(car.mesh);
}

export function animateCar() {
    car.mesh.rotate.z += .01
}

var mousePos = {
    x: Center.x,
    y: Center.y
};

export function updateCar(){
	var targetY = mousePos.y;

    // Move the car at each frame by adding a fraction of the remaining distance
	car.mesh.position.y += (targetY - car.mesh.position.y)*0.1;

	//Rotate the car proportionally to the remaining distance
	car.mesh.rotation.z = (targetY - car.mesh.position.y) * 0.0128;
	car.mesh.rotation.x = (car.mesh.position.y-targetY) * 0.0064;
}


function normalize(v,vmin,vmax,tmin, tmax){
	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;
}

export function handleMouseClick(event) {

    let clickHeightPercentage = ((event.offsetY) / HEIGHT) * 100;
    let carHeightPercentage = ((car.mesh.position.y - 180) / 180) * -100;

    console.log(carHeightPercentage);

    if (clickHeightPercentage < carHeightPercentage && car.mesh.position.y < Center.y + 60) {
        mousePos.y += 30;
    }

    if (clickHeightPercentage > carHeightPercentage && car.mesh.position.y > Center.y - 60) {
        mousePos.y -= 30;
    };
}