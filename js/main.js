import { createScene, camera, renderer, scene } from './word.js';
import { createCoin, createSatellite, createComet, createPlayer } from './objects.js';
import * as Utils from './utils.js';

var clock = new THREE.Clock(false);
var timeCounter= 0.0;

window.addEventListener('load', init, false);

function init() {
	window.carObjects = [];
	window.carPoints = { btc: 0, bis: 0, doge: 0, gamb: 0 }
	window.carLife = 100;
	window.carSpeed = 2;
	window.carColors = Utils.Colors;
	window.carScene = createScene();

	//createSky();
	window.carPlayer = createPlayer();
	window.carScene.add(window.carPlayer.mesh);

	// container.addEventListener('click', handleMouseClick, false);
	document.addEventListener('keydown', handleKeyPress, false);

	// starting a loop
	clock.start();
	loop();
}

function loop() {
	// sky.mesh.rotation.y += .02;

    window.carPlayer.update();

	timeCounter += clock.getDelta();
	if (timeCounter > 0.5) {
		timeCounter = 0.0;
		
		let random = Utils.getRandomInt(0, 5);
		let obj = null;
		switch (random) {
			case 0:
				obj = createCoin('btc');
				break;
			case 1:
				obj = createCoin('doge');
				break;
			case 2:
				obj = createCoin('bis');
				break;
			case 3:
				obj = createCoin('gamb');
				break;
			case 4:
				obj = createSatellite();
				break;
			case 5:
				obj = createComet();
				break;
		}
		window.carScene.add(obj.mesh);
		window.carObjects.push(obj);
	}

	window.carObjects.forEach((obj, index) => {
		if (obj != null) {
			obj.update(window.carSpeed);
			if (checkCollision(obj)) {
				switch (obj.type) {
					case 'coin':
						window.carPlayer.mesh.position.x = -103;
						destroy(index);
						console.log('Trafiles', obj.coinType, '!');
						updateScore(obj);
						break;
					case 'satellite':
						window.carPlayer.mesh.position.x = -110;
						destroy(index);
						console.log('Uszkodziles samochod!');
						break;
					case 'comet':
						window.carPlayer.mesh.position.x = -110;
						destroy(index);
						console.log('Uszkodziles samochod!');
						break;
				}
			};
		};
		if (obj != null && obj.mesh.position.x < -Utils.Edges.rightX - 20) {
			window.carScene.remove(obj.mesh);
			obj = null;
		}
	});

	requestAnimationFrame(loop);
	renderer.render(window.carScene, camera);
}

function checkCollision(obj) {
	if (window.carPlayer.box3.intersectsBox(obj.box3)) {
		return true;
	}
	return false;
}

function handleKeyPress(event) {
    if (event.key == 'ArrowUp' && window.carPlayer.mesh.position.y <  45) {
        window.carPlayer.targetYPosition += 40;
    }

    if (event.key == 'ArrowDown' && window.carPlayer.mesh.position.y > -45) {
        window.carPlayer.targetYPosition -= 40;
    };

	if (event.key == 'ArrowRight') {
        window.carSpeed += 0.5;
    };

	if (event.key == 'ArrowLeft') {
        window.carSpeed -= 0.5;
    };
}

function destroy(index) {
	window.carScene.remove(window.carObjects[index].mesh);
	window.carObjects[index] = null;
}

function updateScore(coin) {
	switch (coin.coinType) {
		case 'btc':
			window.carPoints.btc += 1;
			document.getElementById('btc').innerHTML = window.carPoints.btc;
			break;
		case 'doge':
			window.carPoints.doge += 1;
			document.getElementById('doge').innerHTML = window.carPoints.doge;
			break;
		case 'bis':
			window.carPoints.bis += 1;
			document.getElementById('bis').innerHTML = window.carPoints.bis;
			break;
		case 'gamb':
			window.carPoints.gamb += 1;
			document.getElementById('gamb').innerHTML = window.carPoints.gamb;
			break;
	}
}