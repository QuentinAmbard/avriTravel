package org.avricot.geoviadeo.web.controller.picasa;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.avricot.geoviadeo.web.controller.picasa.domain.Album;
import org.avricot.geoviadeo.web.controller.picasa.domain.LatLng;
import org.avricot.geoviadeo.web.controller.picasa.domain.Photo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	public List<Album> listAlbums() {
		List<Album> albumList = new ArrayList<Album>();
		try {
			System.out.println("OK");
			PicasawebService myService = null;
			myService = new PicasawebService("avriTravel");
			myService.setUserCredentials("avricot.team@gmail.com",
					"table78table");

			URL feedUrl;
			feedUrl = new URL(
					"https://picasaweb.google.com/data/feed/api/user/avricot.team@gmail.com?kind=album");

			UserFeed myUserFeed;
			myUserFeed = myService.getFeed(feedUrl, UserFeed.class);

			Album album;

			for (AlbumEntry myAlbum : myUserFeed.getAlbumEntries()) {
				album = new Album();
				album.setTitle(myAlbum.getTitle().getPlainText());
				album.setDescription(myAlbum.getDescription().getPlainText());
				album.setPhotosNumber(myAlbum.getPhotosUsed());

				URL feedUrlPhoto = new URL(myAlbum.getId().replace("entry",
						"feed/api"));
				AlbumFeed albumFeed = myService.getFeed(feedUrlPhoto,
						AlbumFeed.class);
				List<Photo> photoList = new ArrayList<Photo>();
				Photo photo;
				for (PhotoEntry photoEntry : albumFeed.getPhotoEntries()) {
					photo = new Photo();
					if (photoEntry.getGeoLocation() != null) {
						photo.setLatlng(new LatLng(photoEntry.getGeoLocation()
								.getLatitude(), photoEntry.getGeoLocation()
								.getLongitude()));
					}
					photo.setHeight(photoEntry.getHeight());
					photo.setWidth(photoEntry.getWidth());
					photo.setTimestamp(photoEntry.getTimestamp().getTime());
					try {
						photo.setThumbnailLink(photoEntry.getMediaThumbnails()
								.get(0).getUrl());
					} catch (Exception e) {
						e.printStackTrace();
					}
					try {
						photo.setNormalLink(photoEntry.getMediaContents()
								.get(0).getUrl());
					} catch (Exception e) {
						e.printStackTrace();
					}
					photoList.add(photo);

				}
				album.setPhotos(photoList);

				albumList.add(album);
			}
			return albumList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
