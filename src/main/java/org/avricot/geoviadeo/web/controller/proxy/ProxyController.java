package org.avricot.geoviadeo.web.controller.proxy;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/proxy/*")
public class ProxyController {

	private static final int TIME_OUT_REQUEST = 3000;

	@ResponseBody
	@RequestMapping(value = "/{memberId}", method = RequestMethod.GET)
	public void getViadeoImage(HttpServletResponse response, @PathVariable String memberId) {
		try {
			if (memberId == null) {
				throw new ImageNotFoundExceptions("can't find image, member id null");
			}
			HttpClientParams params = new HttpClientParams();
			params.setSoTimeout(TIME_OUT_REQUEST);
			HttpClient httpClient = new HttpClient(params);

			GetMethod httpget = new GetMethod("http://static2.viadeo-static.com/servlet/photo?memberId=" + memberId + "&type=2");
			try {
				httpClient.executeMethod(httpget);
				InputStream is = httpget.getResponseBodyAsStream();
				byte[] buffer = new byte[4096];
				int len;
				while ((len = is.read(buffer)) > 0) {
					response.getOutputStream().write(buffer, 0, len);
				}
			} catch (HttpException e) {
				response.sendRedirect("../resources/images/noProfile.gif");
			} catch (IOException e) {
				response.sendRedirect("../resources/images/noProfile.gif");
			} catch (Exception e) {
				response.sendRedirect("../resources/images/noProfile.gif");
			}
		} catch (IOException e1) {
			throw new ImageNotFoundExceptions("can't find image, maybe bad memberId" + memberId, e1);
		}
	}
}
