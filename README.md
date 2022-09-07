# Location Provider

Get GPS Coordinates with native devices.

Features Android:
- request location permission
- check location permission
- start / stop continuous location updates
- configure the frequency and conditions of recieving updates
- get single location update
- 

**Only Android compatible** / **Requires Cocos Creator 3.6.0**

# Usage

Install the extension and include `LocationProvider` from this extions in your code.

Note: Always hook `LocationProvider.onLocationChanged` - All GPS updates (listener AND single updates) will only be callbacked in there!

**Hook GPS Update**

```
LocationProvider.onLocationChanged((location: string) => {
 // location:string (JSON)
})
```

**Check permission**

`LocationProvider.hasLocationPermission()`
returns true or false

**Request permission**

`LocationProvider.requestLocationPermission()`

**Start location Listener (recieve updates)**

`LocationProvider.startLocationUpdates()`

**Stop location Listener (stop recieving updates)**

`LocationProvider.stopLocationUpdates()`

**Configure location listener conditions**

minimum interval in miliseconds passed to trigger location update
`LocationProvider.setMinTimeDelay(float)`

minimum distance travelled to trigger location update
`LocationProvider.setMinDistanceChange(float)`

**Request a single location update**

`LocationProvider.requestLocationUpdate()`
