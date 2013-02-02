// ==UserScript==
// @name          Carbon Footprint - eBay Hackathon
// @description   Calculate the carbon footprint of your delivery
// @include       http://www.ebay.com/itm/*
// @require       http://code.jquery.com/jquery-1.9.0.js
// @grant       none
// ==/UserScript==

function processResponse(data) {
	alert("Woaaa, got something");
}

function getOffsetCarbonFootprint(position) {
	unsafeWindow.console.log("hey!!!")
	var data = {id: itemId, lat: position.coords.latitude, lon: position.coords.longitude};
	unsafeWindow.console.log("calling backend with data: " + data);
	$.get("http://ebayhackcarboncred.appspot.com/calc", data, processResponse);
	//alert("Item id: " + itemId + " latitud: " + position.coords.latitude + " longitud: " + position.coords.longitude);
}


var url = document.URL;
var itemId = url.substring(url.lastIndexOf('/') + 1);

navigator.geolocation.getCurrentPosition(getOffsetCarbonFootprint);
