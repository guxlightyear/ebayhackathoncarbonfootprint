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

	$('div.actPanel div.u-cb:eq(2)').after('<div class="u-cb">' +
		'<div id="prcIsum-lbl" class="u-flL lable binLable"><img id="carbon-credit-image" src="http://www.thecarbonfarmer.ca/images/home/home_icon_carbon_credits.png" width="60%" height="60%"/></div>' +
		'<div id="vi-mskumap-none" class="u-flL w29 vi-price" itemtype="http://schema.org/Offer" itemscope="itemscope" itemprop="offers" style="">' +
		'<span id="prcIsum" style="" itemprop="price"> £' + data + '</span>' +
		'<span content="http://schema.org/OnlineOnly" itemprop="availability"></span>' +
		'<span content="GBP" itemprop="priceCurrency"></span>' +
		'</div>' +
		'<div class="u-flL">' +
		'<a id="binBtn_btn" class="vib bl " vib="vib" href="http://offer.ebay.co.uk/ws/eBayISAPI.dll?BinController&rev=17&item=360580868204&fromPage=2047675&fb=1&gch=1" title="" style=" background: -moz-linear-gradient(center top , #A9F5A9, #04B404) repeat scroll 0 0 transparent;"> Offset CO2</a>' +
		'</div>');
	$('div.actPanel div.u-cb:eq(3)').after('<div class="u-cb spcr"></div>');
}

function getOffsetCarbonFootprint(position) {
	var params = {id: itemId, lat: position.coords.latitude, lon: position.coords.longitude};
	unsafeWindow.console.log("calling backend with data: " + params);

	$.get("http://ebayhackcarboncred.appspot.com/calc", params, processResponse);
	//processResponse('0.15');

	//alert("Item id: " + itemId + " latitud: " + position.coords.latitude + " longitud: " + position.coords.longitude);
}

function findItemId(url) {
	var lastPart = url.substring(url.lastIndexOf('/') + 1);
	if (lastPart.indexOf('?') != -1) {
		lastPart = lastPart.substring(0, lastPart.indexOf('?'));
	}

	return lastPart;
}

var itemId = findItemId(document.URL);
navigator.geolocation.getCurrentPosition(getOffsetCarbonFootprint);
