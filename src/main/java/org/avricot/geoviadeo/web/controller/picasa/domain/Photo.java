package org.avricot.geoviadeo.web.controller.picasa.domain;

public class Photo {

	private Long id;
	private LatLng latlng;
	private Long height;
	private Long width;
	private String normalLink;
	private String thumbnailLink;
	private Long timestamp;

	public String getNormalLink() {
		return normalLink;
	}

	public void setNormalLink(String normalLink) {
		this.normalLink = normalLink;
	}

	public String getThumbnailLink() {
		return thumbnailLink;
	}

	public void setThumbnailLink(String thumbnailLink) {
		this.thumbnailLink = thumbnailLink;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public Long getHeight() {
		return height;
	}

	public void setHeight(Long height) {
		this.height = height;
	}

	public Long getWidth() {
		return width;
	}

	public void setWidth(Long width) {
		this.width = width;
	}

	public LatLng getLatlng() {
		return latlng;
	}

	public void setLatlng(LatLng latlng) {
		this.latlng = latlng;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
