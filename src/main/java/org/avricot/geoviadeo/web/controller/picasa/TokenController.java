package org.avricot.geoviadeo.web.controller.picasa;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
