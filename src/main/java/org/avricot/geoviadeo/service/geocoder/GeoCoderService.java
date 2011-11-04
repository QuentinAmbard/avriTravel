package org.avricot.geoviadeo.service.geocoder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.commons.httpclient.HttpConnectionManager;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.LatLng;

@Service
public class GeoCoderService implements IGeoCoderService {

	private final static Map<String, LatLng> cachedLatLong = Collections.synchronizedMap(new HashMap<String, LatLng>());

	private static Logger LOGGER = Logger.getLogger(GeoCoderService.class);
	private static int REQUEST_PER_POOL = 7;
	private static int DELTA_BETWEEN_REQUEST = 1500;
	private static long TIMEOUT = 7000;
	private static int GOOGLE_TIMEOUT = 5000;
	private final Set<String> queue = Collections.synchronizedSet(new LinkedHashSet<String>());
	private final Set<String> inProcess = Collections.synchronizedSet(new LinkedHashSet<String>());
	private final ExecutorService cachedThreadPool;
	private long lastRun = 0;
	static {
		HttpConnectionManager manager = new MultiThreadedHttpConnectionManager();
		Geocoder.setConnectionManager(manager);
	}

	public GeoCoderService() {
		// cachedLatLong.put("", new LatLng(new BigDecimal(10.0), new
		// BigDecimal(0.4)));
		// 10 corePoolSize : number of thread that are "waiting" even if the
		// queue is empty
		// 10 maximumPoolSize : number maximum of thread that can be running at
		// the same time
		// 500 keepAliveTime : time before the desctruction of "free" threads
		// (seconds)
		// 1000 blockingQueueSize : size of the blocking queue. Connection will
		// be refused if the queue is full and the poolsize is equals to the
		// maximumPoolSize
		cachedThreadPool = new ThreadPoolExecutor(REQUEST_PER_POOL, REQUEST_PER_POOL, 500, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(100));
	}

	@Override
	public Map<String, LatLng> geoCodeAddress(List<String> addresses) {
		Map<String, LatLng> result = new HashMap<String, LatLng>();
		Set<String> locationsToQuery = new HashSet<String>();
		for (String address : addresses) {
			LatLng loc = cachedLatLong.get(address);
			if (loc == null || loc.getLat() == null) {
				locationsToQuery.add(address);
			}
		}
		if (!locationsToQuery.isEmpty()) {
			queue.addAll(new ArrayList<String>(locationsToQuery));
			proceed();
		}
		long time = System.currentTimeMillis();
		for (String address : addresses) {
			LatLng latlng;
			while ((latlng = getLatLngFromCache(address)) == null && System.currentTimeMillis() - time < TIMEOUT) {
				try {
					Thread.sleep(20);
				} catch (InterruptedException e) {
					LOGGER.error(e);
				}
			}
			// Something get wrong
			if (latlng == null) {
				LOGGER.error("can't find loc for address" + address);
				// cachedLatLong.put(address, new LatLng());
				latlng = new LatLng();
			}
			result.put(address, latlng);
		}
		return result;
	}

	@Override
	public void logCacheContent() {
		for (Entry<String, LatLng> entry : cachedLatLong.entrySet())
			System.out.println("cachedLatLong.put(\"" + entry.getKey() + "\", new LatLng(new BigDecimal(" + entry.getValue().getLat() + "), new BigDecimal("
					+ entry.getValue().getLng() + ")));");
	}

	private LatLng getLatLngFromCache(String address) {
		if (cachedLatLong.containsKey(address)) {
			return cachedLatLong.get(address);
		}
		return null;
	}

	private synchronized void proceed() {
		int min;
		while (!queue.isEmpty()) {
			long time = System.currentTimeMillis();
			long delta = time - lastRun;
			LOGGER.info("delta:" + delta);
			if (delta < DELTA_BETWEEN_REQUEST) {
				try {
					Thread.sleep(DELTA_BETWEEN_REQUEST - delta);
				} catch (InterruptedException e) {
					LOGGER.error("sleep geocoder error. Clear the queue - " + queue.size() + " elements remaining", e);
					queue.clear();
					break;
				}
			}
			lastRun = time;
			synchronized (queue) {
				min = Math.min(REQUEST_PER_POOL, queue.size());
				for (int i = 0; i < min; i++) {
					String address = queue.iterator().next();
					// TODO tip top ca serait d'enlever le temps d'attente
					if (!inProcess.contains(address)) {
						inProcess.add(address);
						GoogleRequest googleRequest = new GoogleRequest(address, i * 100, inProcess, queue);
						try {
							cachedThreadPool.execute(googleRequest);
						} catch (RejectedExecutionException e) {
							LOGGER.error("RejectedExecutionException", e);
							inProcess.remove(address);
						}
					}
					queue.remove(address);
				}
			}
		}
	}

	private static class GoogleRequest extends Thread {
		private final String address;
		private final long sleep;
		private final Set<String> inProcess;
		private final Set<String> queue;

		public GoogleRequest(String address, long sleep, Set<String> inProcess, Set<String> queue) {
			this.address = address;
			this.sleep = sleep;
			this.inProcess = inProcess;
			this.queue = queue;
		}

		@Override
		public void run() {
			LatLng latLng = null;
			try {
				if (sleep > 0) {
					try {
						Thread.sleep(sleep);
					} catch (InterruptedException e) {
						LOGGER.info("interrupted...");
					}
				}
				final Geocoder geocoder = new Geocoder();
				geocoder.getHttpClient().getHttpConnectionManager().getParams().setSoTimeout(GOOGLE_TIMEOUT);
				GeocoderRequest geocoderRequest = new GeocoderRequestBuilder().setAddress(address).setLanguage("en").getGeocoderRequest();
				LOGGER.info("geocoding '" + address + "...");
				GeocodeResponse geocoderResponse = geocoder.geocode(geocoderRequest);
				if (geocoderResponse == null) {
					latLng = new LatLng();
					LOGGER.error("geocoding error... maybe timeout ? address" + address);
				}
				if (geocoderResponse.getResults().size() == 0) {
					latLng = new LatLng();
					LOGGER.warn("no result for address" + address);
				} else {
					latLng = geocoderResponse.getResults().get(0).getGeometry().getLocation();
					LOGGER.info(address + "=" + latLng);
				}
			} catch (Exception e) {
				LOGGER.error("geocoding error'" + address + "...", e);
				latLng = new LatLng();
			} finally {
				// TODO tip top: synchroniser ca mais on s'en tape.
				LatLng currentLatLng = cachedLatLong.get(latLng);
				if (currentLatLng == null || currentLatLng.getLat() == null) {
					cachedLatLong.put(address, latLng);
				}
				inProcess.remove(address);
				queue.remove(address);
			}
		}
	}
}
