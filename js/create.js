function createItem() {
	let element = document.createElement("img");
	element.src = "data/image/test.png";
	element.classList.add("item");
	element.ondragstart = function() { return false; };
	document.getElementById("mainContainer").appendChild(element);
}