"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.load = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xml_js_1 = require("xml-js");
const load = async function () {
    console.log(`[location-provider] Load in builder.`);
};
exports.load = load;
const onAfterBuild = async function (options, result) {
    // Read AndroidManifest.xml
    let data = await fs_1.default.readFileSync(getNativeDir() + "/app/AndroidManifest.xml");
    let androidManifestJson = JSON.parse((0, xml_js_1.xml2json)(data));
    // check if the permission is already added
    let permissionAlreadyAdded = false;
    for (let i = 0; i < androidManifestJson.elements[0].elements.length; i++) {
        if (androidManifestJson.elements[0].elements[i].name == "uses-permission") {
            if (androidManifestJson.elements[0].elements[i].attributes["android:name"] == "android.permission.ACCESS_FINE_LOCATION") {
                permissionAlreadyAdded = true;
                break;
            }
        }
    }
    if (permissionAlreadyAdded) {
        console.log(`[location-provider] Permission already added.`);
    }
    else {
        androidManifestJson.elements[0].elements.push({
            "type": "element",
            "name": "uses-permission",
            "attributes": {
                "android:name": "android.permission.ACCESS_FINE_LOCATION"
            }
        });
        let androidManifestXml = (0, xml_js_1.json2xml)(androidManifestJson);
        fs_1.default.writeFileSync(getNativeDir() + "/app/AndroidManifest.xml", androidManifestXml);
    }
    // replace/create AppActivity.java content
    let appActivityData = fs_1.default.readFileSync(getExtensionPath() + "/native/android/AppActivity.java");
    console.log(appActivityData.toString());
    console.log(getNativeDir() + "/app/src/main/java/org/cocos2dx/javascript/AppActivity.java");
    fs_1.default.writeFileSync(getNativeDir() + "/app/src/com/cocos/game/AppActivity.java", appActivityData);
    // replace/create GPSManager.java content
    let gpsManagerData = fs_1.default.readFileSync(getExtensionPath() + "/native/android/GPSManager.java");
    fs_1.default.writeFileSync(getNativeDir() + "/app/src/com/cocos/game/GPSManager.java", gpsManagerData);
};
exports.onAfterBuild = onAfterBuild;
const unload = async function () {
    console.log(`[location-provider] Unload in builder.`);
};
exports.unload = unload;
function getNativeDir() {
    return path_1.default.join(Editor.Project.path, 'native/engine', "android");
}
function getExtensionPath() {
    return path_1.default.join(Editor.Project.path, 'extensions', "location-provider");
}
