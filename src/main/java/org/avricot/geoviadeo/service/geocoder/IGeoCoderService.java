package org.avricot.geoviadeo.service.geocoder;

import java.util.List;
import java.util.Map;

import com.google.code.geocoder.model.LatLng;

public interface IGeoCoderService {
	Map<String, LatLng> geoCodeAddress(List<String> addresses);

	void logCacheContent();
}
