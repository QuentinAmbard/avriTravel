package org.avricot.geoviadeo.web.controller.picasa;

import javax.servlet.http.HttpServletRequest;

import org.avricot.geoviadeo.web.controller.picasa.domain.RegisteredRequestResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gdata.client.http.AuthSubUtil;

@Controller
@RequestMapping("/redirect/*")
public class TokenController {

	@ResponseBody
	@RequestMapping(value = "/")
	public String registerToken(HttpServletRequest request) {
		String token = request.getQueryString().substring("token=".length(),
				request.getQueryString().length() - 1);
		request.getSession().setAttribute("token", token);
		return "<html>" + "<head></head>" + "<body onload=\"window.close()\">"
				+ "</body>" + "</html>";
	}

	@ResponseBody
	@RequestMapping(value = "/test")
	public RegisteredRequestResult isRegistered(HttpServletRequest request) {
		System.out.println(request.getSession().getAttribute("token"));
		RegisteredRequestResult result = new RegisteredRequestResult(
				Boolean.valueOf(request.getSession().getAttribute("token") != null),
				getRedirectUrl());

		return result;
	}

	private String getRedirectUrl() {
		String nextUrl = "http://localhost:8080/avriTravel/server/redirect/";
		String scope = "https://picasaweb.google.com/data/";
		boolean secure = false; // set secure=true to request secure AuthSub
								// tokens
		boolean session = true;
		String authSubUrl = AuthSubUtil.getRequestUrl(nextUrl, scope, secure,
				session);

		System.out.println(authSubUrl);
		return authSubUrl;
	}
}
