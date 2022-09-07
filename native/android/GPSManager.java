package com.cocos.game;

import android.Manifest;

import android.content.Context;
import android.content.pm.PackageManager;

import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;

import android.os.Bundle;

import com.cocos.lib.JsbBridgeWrapper;

public class GPSManager implements LocationListener {

	private static double lastLatitude = 0;
	private static double lastLongitude = 0;

	private static long minTimeDelayMS = 2000;
	private static float minDistanceChangeM = 5;

	public static void setMinTimeDelay(float minTimeDelayMS) {
		GPSManager.minTimeDelayMS = (long) minTimeDelayMS;
	}

	public static void setMinDistanceChange(float minDistanceChangeM) {
		GPSManager.minDistanceChangeM = minDistanceChangeM;
	}

	public static void startLocationUpdates() {
		AppActivity.app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				LocationManager locationManager = (LocationManager) AppActivity.app
						.getSystemService(Context.LOCATION_SERVICE);
				if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
					locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, minTimeDelayMS,
							minDistanceChangeM,
							(LocationListener) AppActivity.gpsManager);
				}
			}
		});
	}

	public static void stopLocationUpdates() {
		AppActivity.app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				LocationManager locationManager = (LocationManager) AppActivity.app
						.getSystemService(Context.LOCATION_SERVICE);
				locationManager.removeUpdates((LocationListener) AppActivity.gpsManager);
			}
		});
	}

	public static void requestLocationUpdate() {
		AppActivity.app.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				LocationManager locationManager = (LocationManager) AppActivity.app
						.getSystemService(Context.LOCATION_SERVICE);
				if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
					locationManager.requestSingleUpdate(LocationManager.GPS_PROVIDER,
							(LocationListener) AppActivity.gpsManager,
							null);
				}
			}
		});
	}

	@Override
	public void onLocationChanged(Location location) {
		double newLatitude = location.getLatitude();
		double newLongitude = location.getLongitude();

		if (newLatitude != 0 && newLongitude != 0) {
			lastLatitude = newLatitude;
			lastLongitude = newLongitude;
		}

		JsbBridgeWrapper jbw = JsbBridgeWrapper.getInstance();
		jbw.dispatchEventToScript("onLocationChanged",
				"{\"lat\": " + lastLatitude + ", \"lon\": " + lastLongitude + "}");
	}

	public static boolean hasLocationPermission() {
		return AppActivity.app
				.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
	}

	public static void requestLocationPermission() {
		if (hasLocationPermission())
			return;
		AppActivity.app.requestPermissions(new String[] { Manifest.permission.ACCESS_FINE_LOCATION }, 1);
	}

	@Override
	public void onStatusChanged(String provider, int status, Bundle extras) {
	}

	@Override
	public void onProviderEnabled(String provider) {
	}

	@Override
	public void onProviderDisabled(String provider) {
	}

}
