import { native } from "cc"

export class LocationProvider {
    static onLocationChanged(callback: (location: string) => void) {
        native.jsbBridgeWrapper.addNativeEventListener("onLocationChanged", callback);
    }
    static checkPermission(): boolean {
        let result = native.reflection.callStaticMethod("com/cocos/game/GPSManager", "checkPermission", "()Z");
        return result;
    }
    static requestPermission(): boolean {
        let result = native.reflection.callStaticMethod("com/cocos/game/GPSManager", "requestPermission", "()Z");
        return result;
    }
    static getCurrentLocation(): string {
        let result = native.reflection.callStaticMethod("com/cocos/game/GPSManager", "getCurrentLocation", "()Ljava/lang/String;");
        return result;
    }
}