package org.avricot.geoviadeo.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

public final class UrlUtils {

	/**
	 * Decode the given url. Returns null if the Character Encoding is not
	 * supported.
	 */
	public static String decodeURL(final String encodedURL) {
		try {
			return URLDecoder.decode(encodedURL, "UTF-8");
		} catch (final UnsupportedEncodingException e) {
			return "";
		}
	}

	/**
	 * Add a parameter to the given url. Check if an existing parameter already
	 * exists and add a ? or & between each parameter.
	 */
	public static String addParameterToURL(final String url, final String parameter, final String value) {
		String newUrl;
		if (url.indexOf('?') >= 0) {
			newUrl = url + "&";
		} else {
			newUrl = url + "?";
		}
		return newUrl + parameter + "=" + value;
	}
}
