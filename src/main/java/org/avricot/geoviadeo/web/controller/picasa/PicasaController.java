package org.avricot.geoviadeo.web.controller.picasa;

import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.avricot.geoviadeo.web.controller.picasa.domain.Album;
import org.avricot.geoviadeo.web.controller.picasa.domain.LatLng;
import org.avricot.geoviadeo.web.controller.picasa.domain.Photo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gdata.client.http.AuthSubUtil;
import com.google.gdata.client.photos.PicasawebService;
import com.google.gdata.data.photos.AlbumEntry;
import com.google.gdata.data.photos.AlbumFeed;
import com.google.gdata.data.photos.PhotoEntry;
import com.google.gdata.data.photos.UserFeed;

@Controller
@RequestMapping("/picasa/*")
public class PicasaController {

	@ResponseBody
	@RequestMapping(value = "/albums", method = RequestMethod.GET)
	public List<Album> listAlbums(HttpServletRequest request) {

		List<Album> albumList = new ArrayList<Album>();
		try {
			System.out.println("OK");
			PicasawebService myService = null;
			myService = new PicasawebService("avriTravel");
			String token = (String) request.getSession().getAttribute("token");
			System.out.println("Token before sent" + token);

			String sessionToken = (String) request.getSession().getAttribute(
					"sessionToken");
			if (sessionToken == null) {
				sessionToken = AuthSubUtil.exchangeForSessionToken(token, null);
			}
			request.getSession().setAttribute("sessionToken", sessionToken);
			myService.setAuthSubToken(sessionToken);

			URL feedUrl;
			feedUrl = new URL(
					"https://picasaweb.google.com/data/feed/api/user/default?kind=album");

			UserFeed myUserFeed;
			myUserFeed = myService.getFeed(feedUrl, UserFeed.class);

			Album album;

			for (AlbumEntry myAlbum : myUserFeed.getAlbumEntries()) {
				album = new Album();
				album.setTitle(myAlbum.getTitle().getPlainText());
				album.setDescription(myAlbum.getDescription().getPlainText());

				URL feedUrlPhoto = new URL(myAlbum.getId().replace("entry",
						"feed/api"));
				AlbumFeed albumFeed = myService.getFeed(feedUrlPhoto,
						AlbumFeed.class);
				List<Photo> photoList = new ArrayList<Photo>();
				Photo photo;
				Date firstPhoto = null;
				Date lastPhoto = null;
				for (PhotoEntry photoEntry : albumFeed.getPhotoEntries()) {
					if (photoEntry.getGeoLocation() != null) {
						photo = new Photo();
						photo.setLatlng(new LatLng(photoEntry.getGeoLocation()
								.getLatitude(), photoEntry.getGeoLocation()
								.getLongitude()));
						photo.setHeight(photoEntry.getHeight());
						photo.setWidth(photoEntry.getWidth());
						photo.setTimestamp(photoEntry.getTimestamp().getTime());
						if (firstPhoto == null) {
							firstPhoto = photoEntry.getTimestamp();
						} else {
							if (photoEntry.getTimestamp().before(firstPhoto)) {
								firstPhoto = photoEntry.getTimestamp();
							}
						}
						if (lastPhoto == null) {
							lastPhoto = photoEntry.getTimestamp();
						} else {
							if (photoEntry.getTimestamp().after(lastPhoto)) {
								lastPhoto = photoEntry.getTimestamp();
							}
						}
						setPhotoThumbnail(photo, photoEntry);
						setPhotoNormalPicture(photo, photoEntry);
						photo.setId(Long.valueOf(photo.getNormalLink()
								.hashCode()));
						photoList.add(photo);

					}
				}
				if (photoList.size() != 0) {
					album.setPhotosNumber(photoList.size());
					album.setPhotos(photoList);
					album.setStartDate(firstPhoto.getTime());
					album.setEndDate(lastPhoto.getTime());
					album.setId(firstPhoto.getTime() + lastPhoto.getTime());
					albumList.add(album);
				}
			}
			return albumList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private void setPhotoNormalPicture(Photo photo, PhotoEntry photoEntry) {
		try {
			photo.setNormalLink(photoEntry.getMediaContents().get(0).getUrl());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void setPhotoThumbnail(Photo photo, PhotoEntry photoEntry) {
		try {
			photo.setThumbnailLink(photoEntry.getMediaThumbnails().get(0)
					.getUrl());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
