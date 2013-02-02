// ==UserScript==
// @name          Carbon Footprint - eBay Hackathon
// @description   Calculate the carbon footprint of your delivery
// @include       http://www.ebay.*/itm/*
// @require       http://code.jquery.com/jquery-1.9.0.js
// @grant       none
// ==/UserScript==

function processResponse(data) {
	var amount = Math.round(data*100)/100;

	$('div.actPanel div.u-cb:eq(2)').after('<div class="u-cb">' +
		'<div id="prcIsum-lbl" class="u-flL lable binLable"><img id="carbon-credit-image" src="http://www.thecarbonfarmer.ca/images/home/home_icon_carbon_credits.png" width="60%" height="60%" style="left: 7px;position: relative;top: -12px;"/></div>' +
		'<div id="vi-mskumap-none" class="u-flL w29 vi-price" itemtype="http://schema.org/Offer" itemscope="itemscope" itemprop="offers" style="">' +
		'<span id="prcIsumOffset" style="position:relative;top:2px;" itemprop="price"> £' + amount + '</span>' +
		'<span content="http://schema.org/OnlineOnly" itemprop="availability"></span>' +
		'<span content="GBP" itemprop="priceCurrency"></span>' +
		'</div>' +
		'<div class="u-flL">' +
		'<form method="post" target="_blank" action="https://www.paypal.com/cgi-bin/webscr">' +
		'<input type="hidden" name="cmd" value="_donations" />'+
		'<input type="hidden" name="business" value="kayden@globalwheeling.org" />'+
		'<input type="hidden" name="lc" value="ZA" />'+
		'<input type="hidden" name="item_name" value="Global Wheeling NGO" />'+
		'<input type="hidden" name="amount" value="'+ amount + '" />'+
		'<input type="hidden" name="currency_code" value="GBP" />'+
		'<input type="hidden" name="no_note" value="0" />'+
		'<input type="submit" value="Donate to offset CO2" vib="vib" style=" background: -moz-linear-gradient(center top , #A9F5A9, #007A00) repeat scroll 0 0 transparent;" class="vib bl" />'+
		'</form></div>');
}


function getOffsetCarbonFootprint(position) {
	var params = {id: itemId, lat: position.coords.latitude, lon: position.coords.longitude};
	unsafeWindow.console.log("calling backend with data: " + params);

	$.get("http://ebayhackcarboncred.appspot.com/calc", params, processResponse);
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
