// ==UserScript==
// @name          Carbon Footprint - eBay Hackathon
// @description   Calculate the carbon footprint of your delivery
// @include       http://www.ebay.*/itm/*
// @require       http://code.jquery.com/jquery-1.9.0.js
// @grant       none
// ==/UserScript==

function addCarbonCreditImage(node) {
	node.text("");
	node.prepend('<img id="carbon-credit-image" src="http://www.thecarbonfarmer.ca/images/home/home_icon_carbon_credits.png" width="60%" height="60%"/>');

}

function processResponse(data) {

	var children = $('div.actPanel').children();

	var spcr = children[0].cloneNode();
	var content = children[1].cloneNode();

	$('div.actPanel div.u-cb:eq(2)').after(content);
	$('div.actPanel div.u-cb:eq(3)').after(spcr);

	addCarbonCreditImage($('div.binLable:eq(1)'));
	
	unsafeWindow.console.log($('div.binLable:eq(1)').text());

	alert(elements[0]);
}

function getOffsetCarbonFootprint(position) {
	unsafeWindow.console.log("hey!!!")
	var data = {id: itemId, lat: position.coords.latitude, lon: position.coords.longitude};
	unsafeWindow.console.log("calling backend with data: " + data);
	//$.get("http://ebayhackcarboncred.appspot.com/calc", data, processResponse);

	processResponse(data);
	//alert("Item id: " + itemId + " latitud: " + position.coords.latitude + " longitud: " + position.coords.longitude);
}


var url = document.URL;
var itemId = url.substring(url.lastIndexOf('/') + 1);

navigator.geolocation.getCurrentPosition(getOffsetCarbonFootprint);
