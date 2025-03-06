var tagData;
var gallery = null;

window.onload = function() {
	//document.getElementById("loading").style.visibility = "hidden";
	//document.getElementById("loading").style.opacity = 0;

	gtag('event', 'url', {
		'url': window.location.href
	});
}

function popup(src) {
	let popup = document.getElementById("popup");

	popup.addEventListener("animationend", function() {
		this.classList.remove("blink");
	});

	popup.classList.add("blink");
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
			createItem(obj, "data/images/group/" + obj + ".webp", true);
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
			preloadImage("data/images/group/" + obj + ".webp");
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
	console.log(tag);
	console.log(dir);
	let item = document.createElement("div");

	let img = document.createElement("img");
	img.src = path;
	img.onerror = function() {
		this.src = "data/images/assets/NoImage.webp";
	}

	img.loading = "lazy";

	item.classList.add("item");
	item.ondragstart = function () {
		return false;
	};
	
	if(dir == true) {
		item.onclick = function () {
			if (tag == "artists") {
				window.location = "https://artists.taglib.net";
				return;
			}
			let url = new URL(window.location.href);
			url.searchParams.set('g', tag);
			window.location.href = url;
		};
	}
	else {
		item.onclick = function () {
			//popup(path);
			gtag('event', 'tag: ' + tag, {
			});

			let copy = this.querySelector("#copy");
			copy.style.animation = "fade 1s";
			copy.addEventListener("animationend", function() {
				this.style.animation = "none";
			});

			navigator.clipboard.writeText(tag);
		};
	}

	let copy = document.createElement("div");
	copy.classList.add("copy");
	copy.id = "copy";

	let copytext = document.createElement("h1");
	copytext.innerHTML = "Copied!";
	copy.appendChild(copytext);

	let subtitle = document.createElement("div");
	subtitle.classList.add("subtitle");

	let title = document.createElement("h1");
	title.innerHTML = tag;

	subtitle.appendChild(title);

	item.appendChild(img);
	item.appendChild(copy);
	item.appendChild(subtitle);
	document.getElementById("mainContainer").appendChild(item);
}