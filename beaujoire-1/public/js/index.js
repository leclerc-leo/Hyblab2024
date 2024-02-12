"use strict";

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("intro-btn").addEventListener("click", function () {
		document.getElementById("intro").style.display = "none";
		let gif = document.getElementById("gif").children[0];
		gif.src = "./img/logo.gif";
		gif.style.display = "flex";
		gif.onload = function () {
			setTimeout(function () {
				document.getElementById("gif").style.display = "none";
			}, 5040);
		};
	});
});
