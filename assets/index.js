import Vue from "vue";

// To use https://github.com/KyleAMathews/typefaces
import "typeface-nunito";
import "./css/styles.css";

import "./js/polyfills.js"; //MUST GO AT TOP
import "./js/lazysizes.js";
import "./js/quicklink.js";
import "./js/nojs.js";

// FILTERS APP
import App from "./js/app/filters.vue";

let vm = new Vue({
	el: "#app",
	template: "<App/>",
	components: { App }
});


// if (document.getElementById("app")) {  }
console.log("NODE_ENV=", process.env.NODE_ENV);
