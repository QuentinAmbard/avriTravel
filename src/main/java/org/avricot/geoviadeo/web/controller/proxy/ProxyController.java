package org.avricot.geoviadeo.web.controller.proxy;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/proxy/*")
public class ProxyController {

	private static final int TIME_OUT_REQUEST = 3000;

	private static final Map<Integer, CacheImage> imageCache = new HashMap<Integer, CacheImage>();

	@ResponseBody
	@RequestMapping(value = "/url", method = RequestMethod.GET)
	public void getViadeoImage(HttpServletRequest request,
			HttpServletResponse response) {
		String url = request.getQueryString().substring("url=".length(),
				request.getQueryString().length() - 1);
		System.out.println("Before request : getViadeoImage");
		try {
			if (url == null) {
				throw new ImageNotFoundExceptions(
						"can't find image, url id null");
			}
			url = URLDecoder.decode(url, "UTF-8");
			System.out.println("URL to get : " + url);
			HttpClientParams params = new HttpClientParams();
			params.setSoTimeout(TIME_OUT_REQUEST);
			HttpClient httpClient = new HttpClient(params);

			GetMethod httpget = new GetMethod(url);
			try {
				byte[] is;
				if (imageCache.get(url.hashCode()) != null) {
					System.out.println("Get picture from cache");
					is = imageCache.get(url.hashCode()).getImageContent();
				} else {
					System.out.println("Get picture from the web");
					httpClient.executeMethod(httpget);
					is = httpget.getResponseBody();
					imageCache.put(Integer.valueOf(url.hashCode()),
							new CacheImage(is));
				}
				// byte[] buffer = new byte[4096];
				// int len;
				// while ((len = is.read(buffer)) > 0) {
				// response.getOutputStream().write(buffer, 0, len);
				// }
				response.getOutputStream().write(is);
			} catch (HttpException e) {
				response.sendRedirect("../resources/images/noProfile.gif");
			} catch (IOException e) {
				response.sendRedirect("../resources/images/noProfile.gif");
			} catch (Exception e) {
				response.sendRedirect("../resources/images/noProfile.gif");
			}
		} catch (IOException e1) {
			e1.printStackTrace();
			throw new ImageNotFoundExceptions("can't find image, maybe bad url"
					+ url, e1);
		}
	}
}
