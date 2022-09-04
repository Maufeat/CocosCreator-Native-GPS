import { _decorator, Component, Node, native, Label, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LocationProvider')
export class LocationProvider extends Component {

    @property(Label)
    public label: Label

    @property(Button)
    public btn: Button
    @property(Button)
    public btn1: Button
    @property(Button)
    public btn2: Button

    start() {
        this.btn.node.on(Button.EventType.CLICK, () => {
            this.label.string = this.checkPermission().toString();
        });
        this.btn1.node.on(Button.EventType.CLICK, () => {
            this.label.string = this.requestPermission().toString();
        });
        this.btn2.node.on(Button.EventType.CLICK, () => {
            this.label.string = this.getCurrentLocation();
        });

        native.jsbBridgeWrapper.addNativeEventListener("onLocationChanged", (location: string) => {
            this.label.string = "jsb: " + location;
        });
    }

    getCurrentLocation(): string{
        let result = native.reflection.callStaticMethod("com/cocos/game/GPSManager", "getCurrentLocation", "()Ljava/lang/String;");
        return result;
    }

    checkPermission(): boolean{
        let result = native.reflection.callStaticMethod("com/cocos/game/GPSManager", "checkPermission", "()Z");
        return result;
    }

    requestPermission(): boolean{
        let result = native.reflection.callStaticMethod("com/cocos/game/GPSManager", "requestPermission", "()Z");
        return result;
    }

    update(deltaTime: number) {
        
    }
}

