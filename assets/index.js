// To use https://github.com/KyleAMathews/typefaces
// import "typeface-nunito";


import "./js/polyfills.js"; //MUST GO AT TOP
import "./js/lazysizes.js";
import "./js/quicklink.js";
import "./js/nojs.js";

import Vue from "vue";
import App from "./js/app/filters.vue";

// FILTERS APP
if (document.getElementById("app")) { 

	new Vue({
		el: "#app",
		components: { App }
	});
} 
console.log("NODE_ENV=", process.env.NODE_ENV);

// TODO: Add back --experimental-scope-hoisting to parcel command after upgrade to 1.13 (if path issue is fixed)
