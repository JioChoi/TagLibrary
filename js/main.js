var tagData;
var gallery = null;

window.onload = function() {
	//document.getElementById("loading").style.visibility = "hidden";
	//document.getElementById("loading").style.opacity = 0;
}

function home() {
	window.location.href = location.protocol + '//' + location.host + location.pathname
}

function loadTagData() {
	tagData = JSON.parse(JSON.stringify(data));
	console.log(tagData);
}

function createItems() {
	url = new URL(window.location.href);
	gallery = url.searchParams.get("g");
	
	if(gallery == null) {
		for (obj in tagData)
			createItem(obj, "data/images/group/" + obj + ".jpg", true);
	}
	else {
		for(var i = 0; i < tagData[gallery].length; i++)
			createItem(tagData[gallery].at(i).tag, "data/images/tag/" + tagData[gallery].at(i).filename, false);
	}
}

function preloadIamges() {
	url = new URL(window.location.href);
	gallery = url.searchParams.get("g");
	
	if(gallery == null) {
		for (obj in tagData)
			preloadImage("data/images/group/" + obj + ".jpg");
	}
	else {
		for(var i = 0; i < tagData[gallery].length; i++)
			preloadImage("data/images/tag/" + tagData[gallery].at(i).filename);
	}
}

function preloadImage(path) {
	var img = new Image();
	img.src = path;
}

function createItem(tag, path, dir) {
	let item = document.createElement("div");

	let img = document.createElement("img");
	img.src = path;
	img.onerror = function() {
		this.src = "data/images/assets/NoImage.png";
	}

	img.loading = "lazy";

	item.classList.add("item");
	item.ondragstart = function () {
		return false;
	};
	
	if(dir == true) {
		item.onclick = function () {
			let url = new URL(window.location.href);
			url.searchParams.set('g', tag);
			window.location.href = url;
		};
	}
	else {
		item.onclick = function () {
			navigator.clipboard.writeText(tag);
		};
	}

	let subtitle = document.createElement("div");
	subtitle.classList.add("subtitle");

	let title = document.createElement("h1");
	title.innerHTML = tag;

	subtitle.appendChild(title);

	item.appendChild(img);
	item.appendChild(subtitle);
	document.getElementById("mainContainer").appendChild(item);
}