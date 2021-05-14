export function checkCollision(obj1, obj2, scene) {

    if ((obj1.mesh.position.x - obj2.mesh.position.x) < -14 &&
        (obj1.mesh.position.x - obj2.mesh.position.x) > -16 &&
        (obj1.mesh.position.y - obj2.mesh.position.y) < 5 &&
        (obj1.mesh.position.y - obj2.mesh.position.y) > -5) {
        console.log(obj1.mesh.position.x - obj2.mesh.position.x);
        console.log(obj1.mesh.position.y - obj2.mesh.position.y);
        scene.remove(obj2.mesh);
        obj2 = null;
        return true;
    }
    return false;
}