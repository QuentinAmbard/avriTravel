package org.avricot.geoviadeo.web.controller.picasa.domain;

public class RegisteredRequestResult {

	private Boolean isRegistered;

	private String redirectUrl;

	public RegisteredRequestResult(Boolean isRegistered, String redirectUrl) {
		super();
		this.isRegistered = isRegistered;
		this.redirectUrl = redirectUrl;
	}

	public Boolean getIsRegistered() {
		return isRegistered;
	}

	public void setIsRegistered(Boolean isRegistered) {
		this.isRegistered = isRegistered;
	}

	public String getRedirectUrl() {
		return redirectUrl;
	}

	public void setRedirectUrl(String redirectUrl) {
		this.redirectUrl = redirectUrl;
	}
}
