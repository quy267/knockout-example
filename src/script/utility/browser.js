module.exports = (function() {
	var userAgent = navigator.userAgent.toLowerCase(),
		result = {
			safari: false,
			chrome: false,
			firefox: false,
			opera: false,
			netscape: false,
			ie: false,
			ie8: false,
			ie9: false,
			ie10: false,
			ie11: false,
			trident: false,
			edge: false,
			ios: false,
			iphone: false,
			ipad: false,
			android: false	
		};

	// Mobile OS
	if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1 || userAgent.indexOf("ipod") != -1) {
		userAgent.ios = true;
		userAgent.iphone = userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipod") != -1;
		userAgent.ipad = userAgent.indexOf("ipad") != -1;
	} else if (userAgent.indexOf("android") != -1) {
		userAgent.android = true;
	}

	// Browser
	if (userAgent.indexOf("netscape") != -1) {
		result.netscape = true;
	} else if (userAgent.indexOf("opera") != -1) {
		result.opera = true;
	} else if (userAgent.indexOf("msie") != -1 || userAgent.indexOf("trident/7") != -1) {
		result.ie = true;
		// get version
		result.ie8 = document.uniqueID && document.documentMode === 8;
	    result.ie9 = document.uniqueID && document.documentMode === 9;
	    result.ie10 = document.uniqueID && document.documentMode === 10;
	    result.ie11 = document.uniqueID && document.documentMode === 11;
	    result.trident = document.uniqueID;
	} else if (userAgent.indexOf("firefox") != -1) {
		result.firefox = true;
	} else if (userAgent.indexOf("edge") != -1) {
		// Mozilla/5.0 (Windows NT 10.0; <64-bit tags>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko)
		// Chrome/<Chrome Rev> Safari/<WebKit Rev> Edge/<EdgeHTML Rev>.<Windows Build>
		result.edge = true;
	} else if (userAgent.indexOf("chrome") != -1) {
		// Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3073.0 Safari/537.36
		result.isChrome = true;
	} else if (userAgent.indexOf("safari") != -1) {
		// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7
		result.isSafari = true;
	}

	return result;
})();