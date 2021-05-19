export const Colors = {
	red: 0xd83131,
	white: 0xd8d0d1,
	brown: 0x59332e,
	yellow: 0xe8ac0c,
	pink: 0xF5986E,
	brownDark: 0x23190f,
	blue: 0x68c3c0,
	black: 0x111111
};

export var speed = 4;
export var Dimensions = getDimensions();
export var aspectRatio = Dimensions.width / Dimensions.height;
export var Edges = getEdges();

export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

function getDimensions() {
	let width = document.getElementById('universe').getBoundingClientRect().width;
	let height = document.getElementById('universe').getBoundingClientRect().height;
	return { width, height };
}

function getEdges() {
	let topY = Math.tan(Math.PI / 6) * 200;
	let rightX = topY * aspectRatio;
	return { rightX, topY }
}

