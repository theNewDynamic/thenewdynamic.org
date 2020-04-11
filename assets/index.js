// To use https://github.com/KyleAMathews/typefaces
// import "typeface-nunito";

import "./js/polyfills.js"; //MUST GO AT TOP
import "alpinejs";
import "./js/search/index.js";
import "./js/lazysizes.js";
import "./js/quicklink.js";
import "./js/nojs.js";

// window.onload {
// 	var getParams = function (url) {
// 		var params = {};
// 		var parser = document.createElement("a");
// 		parser.href = url;
// 		var query = parser.search.substring(1);
// 		var vars = query.split("&");
// 		for (var i = 0; i < vars.length; i++) {
// 			var pair = vars[i].split("=");
// 			params[pair[0]] = decodeURIComponent(pair[1]);
// 		}
// 		return params;
// 	};

// 	getParams(window.location.href);

// 	// Get parameters from a URL string
// 	var url = window.location.href;
// 	const result = url + getParams(url);

// 	fb_share.href =
// 		"https://twitter.com/intent/tweet?text=Jamstack%20Tools%20at%20The%20New%20Dynamic&url=" +
// 		result;
// };

// console.log("url", result);
