package org.avricot.geoviadeo.web.controller.picasa.domain;

import java.util.ArrayList;
import java.util.List;

public class Album {

	private Long id;
	private String title;
	private String description;
	private Integer photosNumber;
	private Long startDate;
	private Long endDate;
	private List<Photo> photos = new ArrayList<Photo>();

	public List<Photo> getPhotos() {
		return photos;
	}

	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getPhotosNumber() {
		return photosNumber;
	}

	public void setPhotosNumber(Integer photosNumber) {
		this.photosNumber = photosNumber;
	}

	public Long getStartDate() {
		return startDate;
	}

	public void setStartDate(Long startDate) {
		this.startDate = startDate;
	}

	public Long getEndDate() {
		return endDate;
	}

	public void setEndDate(Long endDate) {
		this.endDate = endDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
