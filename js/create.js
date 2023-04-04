function createItem(parent) {
	let element = document.createElement("img");
	element.src = "/parent/" + parent + ".png";
	element.classList.add("item");
	element.ondragstart = function() { return false; };
	document.getElementById("mainContainer").appendChild(element);
}