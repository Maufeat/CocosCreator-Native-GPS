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

	private static long minTimeDelayMS = 2000; // 2 second, then update location
	private static float minDistanceChangeM = 5; // 5 meters, then update location

    public static void initJsbBridge(){
	}
    
	@Override
	public void onLocationChanged(Location location)
	{
		double newLatitude = location.getLatitude();
		double newLongitude = location.getLongitude();
		
		System.out.println("onLocationChanged " + newLatitude + ", " + newLongitude);
		
		if (newLatitude != 0 && newLongitude != 0)
		{
			lastLatitude = newLatitude;
			lastLongitude = newLongitude;
		}
		
		// Dispatch to Script
        JsbBridgeWrapper jbw = JsbBridgeWrapper.getInstance();
		jbw.dispatchEventToScript("onLocationChanged", "{\"lat\": " + lastLatitude + ", \"lon\": " + lastLongitude + "}");
	}
    
	@Override
	public void onStatusChanged(String provider, int status, Bundle extras)
	{
	}

	@Override
	public void onProviderEnabled(String provider)
	{
	}

	@Override
	public void onProviderDisabled(String provider)
	{
	}
	
	public static String getCurrentLocation()
	{
		if (lastLatitude != 0 && lastLongitude != 0)
			return "{\"lat\": " + lastLatitude + ", \"lon\": " + lastLongitude + "}";

		getLocationCoordinate();
		return "";
	}

	public static void getLocationCoordinate()
	{
		System.out.println("getLocationCoordinate check " + lastLatitude + "," + lastLongitude);
		if (lastLatitude != 0 && lastLongitude != 0)
			return;
		
		AppActivity.app.runOnUiThread (new Runnable ()
		{
			@Override
			public void run ()
			{
				AppActivity.gpsManager.requestLocationData();
			}
		});
	}

    public static boolean checkPermission() {
        // Run on UI Thread?
        return AppActivity.app.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    public static boolean requestPermission() {
        // Run on UI Thread?
		if (AppActivity.app.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED)
		{
			AppActivity.app.requestPermissions(new String[] { Manifest.permission.ACCESS_FINE_LOCATION}, 1);
			return checkPermission();
		} else {
            return true;
        }
    }

	public void requestLocationData()
	{
		LocationManager locationManager = (LocationManager) AppActivity.app.getSystemService(Context.LOCATION_SERVICE);
		if (AppActivity.app.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED)
		{
			AppActivity.app.requestPermissions(new String[] { Manifest.permission.ACCESS_FINE_LOCATION}, 1);
			return;
		}
		locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, minTimeDelayMS, minDistanceChangeM, (LocationListener) AppActivity.gpsManager);
		locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, minTimeDelayMS, minDistanceChangeM, (LocationListener) AppActivity.gpsManager);
	}
}
