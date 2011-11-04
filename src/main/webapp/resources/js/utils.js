// String containing replacement characters for stripping accents 
var __stripstring = 'AAAAAAACEEEEIIII' + 'DNOOOOO.OUUUUY..' + 'aaaaaaaceeeeiiii' + 'dnooooo.ouuuuy.y' + 'AaAaAaCcCcCcCcDd'
		+ 'DdEeEeEeEeEeGgGg' + 'GgGgHhHhIiIiIiIi' + 'IiIiJjKkkLlLlLlL' + 'lJlNnNnNnnNnOoOo' + 'OoOoRrRrRrSsSsSs' + 'SsTtTtTtUuUuUuUu'
		+ 'UuUuWwYyYZzZzZz.';
var GB = GB || {};
GB.stripaccents= function(str) {
	for ( var i = 0; i < str.length; i++) {
		var ch = str[i];
		var chindex = ch.charCodeAt(0) - 192; // Index of character code in
												// the strip string
		if (chindex >= 0 && chindex < __stripstring.length) {
			// Character is within our table, so we can strip the accent...
			var outch = __stripstring.charAt(chindex);
			// ...unless it was shown as a '.'
			if (outch != '.') {
				str = str.substring(0, i) + outch + str.substring(i + 1, str.length);
			}
		}
	}
	return str;
};

GB.addParameterToURI= function(aUrl, aName, aValue) {
    if(aUrl.indexOf("?")==-1) {
        aUrl+="?";
	} else {
		aUrl+="&";
	}
	aUrl+=aName+"="+aValue;
	return aUrl;
};

GB.textNormalizer= function(text) {
	text = text.clean();
	text = text.toLowerCase();
	return text.capitalize();
};