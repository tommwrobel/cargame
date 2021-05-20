import * as Utils from './utils.js';

export function createCoin(type) {
	let object = new THREE.Object3D();
    let geo = new THREE.CylinderGeometry(10, 10, 4, 6);
    let mat = new THREE.MeshPhongMaterial({ color: Utils.Colors.yellow, flatShading: true });
	let coin = new THREE.Mesh(geo, mat);
	object.add(coin);

    //random vertical position
    object.position.y = Utils.getRandomInt(-2, 2) * 40;
    object.position.x = Utils.Edges.rightX;
    object.rotation.x = Math.PI / 2;

    return {
        mesh: object,
        type: 'coin',
        coinType: type,
        box3: new THREE.Box3().setFromObject(object),
        update: function(speed) {
            this.box3 = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.x -= speed;
            this.mesh.rotation.z -= .1;
        }
    }
}

export function createSatellite() {
	let object = new THREE.Object3D();
    let geoBody = new THREE.CylinderGeometry(6, 8, 12, 16);
    let mat = new THREE.MeshPhongMaterial({ color: Utils.Colors.white, flatShading: false });
	let satBody = new THREE.Mesh(geoBody, mat);
    satBody.rotation.z = Math.PI / 2;
	object.add(satBody);

    let geoWing = new THREE.BoxGeometry(2, 24, 12, 32);
    let wingRight = new THREE.Mesh(geoWing, mat);
    let wingLeft = new THREE.Mesh(geoWing, mat);
    wingRight.position.set(0, 22, 0);
    wingLeft.position.set(0, -22, 0);

	object.add(wingRight);
	object.add(wingLeft);

    //random vertical position
    object.position.y = Utils.getRandomInt(-2, 2) * 40;
    object.position.x = Utils.Edges.rightX;
    object.rotation.x = Utils.getRandomInt(0, 2);
    object.rotation.z = Utils.getRandomInt(0, 2);

    return {
        mesh: object,
        type: 'satellite',
        box3: new THREE.Box3().setFromObject(object),
        update: function(speed) {
            this.box3 = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.x -= speed;
            this.mesh.rotation.z -= .03;
            this.mesh.rotation.x -= .03;
            this.mesh.rotation.y -= .03;
        }
    }
}

export function createComet() {
	let object = new THREE.Object3D();

    let mat = new THREE.MeshPhongMaterial({ color: Utils.Colors.darkGrey, flatShading: false });
    let geo = new THREE.DodecahedronGeometry(24, 0);
    object.add(new THREE.Mesh(geo, mat));

    let scale = Utils.getRandomInt(3, 10) * 0.1;
    object.scale.set(scale, scale, scale);

    object.position.y = Utils.getRandomInt(-2, 2) * 40;
    object.position.x = Utils.Edges.rightX;
    object.rotation.x = Math.PI / 2;

    return {
        mesh: object,
        type: 'comet',
        box3: new THREE.Box3().setFromObject(object),
        update: function(speed) {
            let boxMesh = this.mesh.clone();
            boxMesh.scale.set(0.7, 0.5, 0.7);
            this.box3 = new THREE.Box3().setFromObject(boxMesh);
            this.mesh.position.x -= speed;
            this.mesh.rotation.z -= .02;
            this.mesh.rotation.x += .02;
            this.mesh.rotation.y += .01;
        }
    }
}

export function createPlayer() {
	let object = new THREE.Object3D();

    let geoBody = new THREE.BoxGeometry(30, 10, 10, 1, 1, 1);
	let matBody = new THREE.MeshPhongMaterial({ color: Utils.Colors.red, flatShading: true });
	let body = new THREE.Mesh(geoBody, matBody);
    object.add(body);

	let geoRoof = new THREE.BoxGeometry(2, 8, 9, 1, 1, 1);
	let matRoof = new THREE.MeshPhongMaterial({ color: Utils.Colors.white, flatShading: true });
	let roof = new THREE.Mesh(geoRoof, matRoof);
	roof.position.set(4, 8, 0);
	roof.rotation.z = 0.2;
    object.add(body);

    object.position.x = -100;

    return {
        mesh: object,
        type: 'player',
        box3: new THREE.Box3().setFromObject(object),
        targetYPosition: object.position.y,
        update: function() {
            this.box3 = new THREE.Box3().setFromObject(this.mesh);

            object.position.x += (-100 - object.position.x) * 0.1;
            object.position.y += (this.targetYPosition - object.position.y) * 0.1;
            object.rotation.z = (this.targetYPosition - object.position.y) * 0.0128;
            object.rotation.x = (object.position.y - this.targetYPosition) * 0.0064;
        }
    }
}

export function createExplosion(size, color, location) {
    let object = new THREE.Object3D();

	let mat = new THREE.MeshPhongMaterial({ color: color, flatShading: true });
    let mesh = [];
    for (let i = 0; i < 8; i++) {
        mesh.push(new THREE.Mesh(new THREE.BoxGeometry(15, 15, 15, 2), mat));
    }

    mesh[0].position.set(2, 2, 2);
    mesh[1].position.set(2, 2, -2);
    mesh[2].position.set(2, -2, -2);
    mesh[3].position.set(-2, -2, -2);
    mesh[4].position.set(-2, 2, 2);
    mesh[5].position.set(-2, -2, 2);
    mesh[6].position.set(2, -2, 2);
    mesh[7].position.set(-2, 2, 2);

    for (let i = 0; i < mesh.length; i++) {
        object.add(mesh[i]);
    }

    object.position.set(location.x - 5, location.y, location.z);
    object.rotation.x = Math.PI / 3;

    return {
        mesh: object,
        type: 'bgobject',
        update: function() {
            if (object != null && object.children[0].position.x - object.position.x < 160) {
                let speed = 2.5;
                object.children.forEach(obj => {
                    obj.position.x += (obj.position.x > 0) ? speed : -speed;
                    obj.position.y += (obj.position.y > 0) ? speed : -speed;
                    obj.position.z += (obj.position.z > 0) ? speed : -speed;
                    obj.rotation.y += 0.2;
                    obj.scale.x -= 0.05;
                    obj.scale.y -= 0.05;
                    obj.scale.z -= 0.05;
                });
                object.position.x -= speed;
                object.rotation.x += 0.02;
            } else if (object != null) {
                window.carScene.remove(object);
                object = null;
            }
        }
    }
}