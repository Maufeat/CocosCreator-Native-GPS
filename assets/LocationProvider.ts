import { native, sys } from "cc"

const IS_ANDROID = sys.os === sys.OS.ANDROID
const IS_IOS = sys.os === sys.OS.IOS

export class LocationProvider {
    static startLocationUpdates() {
        if (IS_ANDROID)
            native.reflection.callStaticMethod("com/cocos/game/GPSManager", "startLocationUpdates", "()V");
        else if (IS_IOS)
            console.log("TODO: startLocationUpdates for iOS");
    }
    static stopLocationUpdates() {
        if (IS_ANDROID)
            native.reflection.callStaticMethod("com/cocos/game/GPSManager", "stopLocationUpdates", "()V");
        else if (IS_IOS)
            console.log("TODO: stopLocationUpdates for iOS");
    }
    static requestLocationUpdate(){
        if (IS_ANDROID)
            native.reflection.callStaticMethod("com/cocos/game/GPSManager", "requestLocationUpdate", "()V");
        else if (IS_IOS)
            console.log("TODO: requestLocationUpdate for iOS");
    }
    static setMinTimeDelay(timeInMs: number) {
        if (IS_ANDROID)
            native.reflection.callStaticMethod("com/cocos/game/GPSManager", "setMinTimeDelay", "(F)V", timeInMs);
        else if (IS_IOS)
            console.log("TODO: setMinTimeDelay for iOS");
    }
    static setMinDistanceChange(distanceInMeter: number) {
        if (IS_ANDROID)
            native.reflection.callStaticMethod("com/cocos/game/GPSManager", "setMinDistanceChange", "(F)V", distanceInMeter);
        else if (IS_IOS)
            console.log("TODO: setMinDistanceChange for iOS");
    }
    static onLocationChanged(callback: (location: string) => void) {
        if (IS_ANDROID)
            native.jsbBridgeWrapper.addNativeEventListener("onLocationChanged", callback);
        else if (IS_IOS)
            console.log("TODO: onLocationChanged for iOS");
    }
    static hasLocationPermission(): boolean {
        if (IS_ANDROID) {
            let result = native.reflection.callStaticMethod("com/cocos/game/GPSManager", "hasLocationPermission", "()Z");
            return result;
        }
        else if (IS_IOS) {
            console.log("TODO: hasLocationPermission for iOS");
        }
        return false
    }
    static requestLocationPermission() {
        if (IS_ANDROID)
            native.reflection.callStaticMethod("com/cocos/game/GPSManager", "requestLocationPermission", "()V");
        else if (IS_IOS)
            console.log("TODO: requestLocationPermission for iOS");
    }
}