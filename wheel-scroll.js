let wheelX = wheelY = 0;
let cursorX = cursorY = 0;
let speedX = speedY = 0;
let isWheelScroll = false;
let deadZone = 20;
let slowdown = 5;

window.addEventListener('mousedown', wheelClickListener);

function wheelClickListener(event) {
	if (isWheelScroll) return exitWheelScroll();

	if (event.button !== 1) return;

	for (let i = 0; i < event.path.length; ++i) {
		if (event.path[i].tagName === 'A') return;
	}

	launchWheelScroll();
}

function launchWheelScroll() {
	isWheelScroll = true;

	wheelX = event.clientX;
	wheelY = event.clientY;

	createBlockContentDiv();
	document.documentElement.style.cursor = 'url("http://drive.google.com/uc?export=view&id=14L7HHuCpAVoHPTmsTZdLNNl1CiNfB9ID"), crosshair';
	window.onmousemove = mouseMoveListener;
	window.onscroll = scrollPage;
}

function exitWheelScroll() {
	isWheelScroll = false;
	removeBlockContentDiv();
	document.documentElement.style.cursor = 'default';
	window.onmousemove = '';
	window.onscroll = '';
}

function mouseMoveListener(event) {
	cursorX = event.clientX;
	cursorY = event.clientY;

	speedX = (cursorX - wheelX) / slowdown;
	speedY = (cursorY - wheelY) / slowdown;

	scrollTriggerX();
	scrollTriggerY();
}

function scrollPage(event) {
	if (Math.abs(cursorX - wheelX) > deadZone) {
		window.scrollBy(speedX, 0);
	}
	if (Math.abs(cursorY - wheelY) > deadZone) {
		window.scrollBy(0, speedY);
	}
}

function scrollTriggerY() {
	window.scrollBy(0, 1);
	window.scrollBy(0, -1);
}

function scrollTriggerX() {
	window.scrollBy(1, 0);
	window.scrollBy(-1, 0);
}

function createBlockContentDiv() {
	let blockContentDiv = document.createElement("div");
	blockContentDiv.style.width = "100%";
	blockContentDiv.style.height = "100%";
	blockContentDiv.style.zIndex = 2147483647;
	blockContentDiv.style.position = "fixed";
	blockContentDiv.style.top = 0;
	blockContentDiv.setAttribute('id', 'wheel-scroll-block-page-content');
	document.body.appendChild(blockContentDiv);
}

function removeBlockContentDiv() {
	var blockContentDiv = document.getElementById("wheel-scroll-block-page-content");
	document.body.removeChild(blockContentDiv);
}
