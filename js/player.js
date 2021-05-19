import { Colors, Dimensions } from './globals.js';

export var player;
var playerBox;
var mousePos = { x: 0, y: 0 };

var Player = function() {
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(25, 10, 10, 1, 1, 1);
	var matCockpit = new THREE.MeshPhongMaterial({ color:Colors.red, flatShading: true });
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
};

export function createPlayer(scene){ 
	player = new Player(Colors);
	playerBox = new THREE.Box3().setFromObject(player.mesh);
    player.mesh.position.x -= 100;
	scene.add(player.mesh);
}

export function updatePlayer() {
	var targetY = mousePos.y;

    // Move the car at each frame by adding a fraction of the remaining distance
	player.mesh.position.y += (targetY - player.mesh.position.y) * 0.1;

	//Rotate the car proportionally to the remaining distance
	player.mesh.rotation.z = (targetY - player.mesh.position.y) * 0.0128;
	player.mesh.rotation.x = (player.mesh.position.y - targetY) * 0.0064;

	//updating player collision box
	playerBox.setFromObject(player.mesh);
}

export function handleMouseClick(event) {
    let clickHeightPercentage = ((event.offsetY) / Dimensions.height) * 100;

    if (clickHeightPercentage <= 50 && player.mesh.position.y <  45) {
        mousePos.y += 40;
    }

    if (clickHeightPercentage > 50 && player.mesh.position.y > -45) {
        mousePos.y -= 40;
    };
}

export function checkCollisions(objects, scene) {
	objects.forEach((object, index, objects) => {
		if (object != null) {
			let objectBox = new THREE.Box3().setFromObject(object.mesh);
			console.log(object);

			if (playerBox.intersectsBox(objectBox)) {
				document.getElementById(object.type).innerHTML = parseInt(document.getElementById(object.type).innerHTML) + 1;
				scene.remove(object.mesh);
	
				objects[index] = null;
				console.log(index);
			}
		}
    });
}