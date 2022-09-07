# Location Provider

Get GPS Coordinates with native devices!

# Usage

Install the extension and include `LocationProvider` in your code.

# Examples

**Check Permission**

`LocationProvider.checkPermission()`
returns true or false

**Request Permission**

`LocationProvider.requestPermission()`

**Get Location**

`LocationProvider.getCurrentLocation()`
returns string (JSON)

# Hook GPS Update

```
LocationProvider.onLocationChanged((location: string) => {
 // location:string (JSON)
})
```
