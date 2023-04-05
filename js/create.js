function createItem(parent) {
	let element = document.createElement("img");
	element.src = "/group/" + parent + ".png";
	element.onerror = function error() {
		this.src = "data/images/assets/NoImage.png";
	}
	element.classList.add("item");
	element.ondragstart = function() { return false; };
	document.getElementById("mainContainer").appendChild(element);
}