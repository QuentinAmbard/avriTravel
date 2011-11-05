package org.avricot.geoviadeo.web.controller.proxy;

public class CacheImage {

	private byte[] imageContent;

	public CacheImage(byte[] imageContent) {
		super();
		this.imageContent = imageContent;
	}

	public byte[] getImageContent() {
		return imageContent;
	}

	public void setImageContent(byte[] imageContent) {
		this.imageContent = imageContent;
	}
}
