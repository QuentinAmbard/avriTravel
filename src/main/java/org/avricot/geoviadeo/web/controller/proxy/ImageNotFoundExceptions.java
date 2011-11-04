package org.avricot.geoviadeo.web.controller.proxy;

public class ImageNotFoundExceptions extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ImageNotFoundExceptions(String message, Exception e) {
		super(message, e);
	}

	public ImageNotFoundExceptions(String message) {
		super(message);
	}
}
