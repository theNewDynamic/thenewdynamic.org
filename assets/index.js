

// To use https://github.com/KyleAMathews/typefaces
import "typeface-nunito";
import "./css/styles.css";

import "./js/polyfills.js"; //MUST GO AT TOP
import "./js/lazysizes.js";
import "./js/quicklink.js";
import "./js/nojs.js";

// FILTERS APP
		// import Vue from "vue";
		// import App from "./js/app/filters.vue";
		// new Vue({
		// 	el: "#app",
		// 	components: { App }
		// });

//if (document.getElementById("app")) { 
	//may want to use this to not get errors on pages we're not using Vue
//} 
console.log("NODE_ENV=", process.env.NODE_ENV);
