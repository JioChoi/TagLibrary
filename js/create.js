function createItem(parent) {
	let item = document.createElement("div");

	let img = document.createElement("img");
	img.src = "/group/" + parent + ".webp";
	img.onerror = function error() {
		this.src = "data/images/assets/NoImage.webp";
	}

	item.classList.add("item");
	item.ondragstart = function () {
		return false;
	};
	
	item.onclick = function () {
		let url = new URL(window.location.href);
		url.searchParams.set('g', parent);
		window.location.href = url;
	};

	let subtitle = document.createElement("div");
	subtitle.classList.add("subtitle");

	let title = document.createElement("h1");
	title.innerHTML = parent;

	subtitle.appendChild(title);

	item.appendChild(img);
	item.appendChild(subtitle);
	document.getElementById("mainContainer").appendChild(item);
}