package org.avricot.geoviadeo.web.controller.geocoder;

import java.util.ArrayList;
import java.util.Map;

import javax.inject.Inject;

import org.avricot.geoviadeo.service.geocoder.IGeoCoderService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.code.geocoder.model.LatLng;

@Controller
@RequestMapping("/geocoder/*")
public class GeocoderController {

	@Inject
	IGeoCoderService geoCoderService;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public Map<String, LatLng> home2d(Model model, @RequestBody ArrayList<String> localizations) {
		Map<String, LatLng> addresses = geoCoderService.geoCodeAddress(localizations);
		return addresses;
	}

	@ResponseBody
	@RequestMapping(value = "/log", method = RequestMethod.GET)
	public void logLocation() {
		geoCoderService.logCacheContent();
	}

	@RequestMapping(method = RequestMethod.GET)
	public Map<String, LatLng> home2dnormal(Model model, @RequestParam ArrayList<String> localizations) {
		Map<String, LatLng> addresses = geoCoderService.geoCodeAddress(localizations);
		return addresses;
	}
}
