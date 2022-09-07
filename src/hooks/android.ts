import { BuildHook } from '../../@types';
import fs from "fs"
import path from "path"
import { xml2json, json2xml } from 'xml-js';

export const load: BuildHook.load = async function() {
    console.log(`[location-provider] Load in builder.`)
};


export const onAfterBuild: BuildHook.onAfterBuild = async function(options, result) {
    // Read AndroidManifest.xml
    let data = await fs.readFileSync(getNativeDir() + "/app/AndroidManifest.xml")
    let androidManifestJson = JSON.parse(xml2json(data))
    // check if the permission is already added
    let permissionAlreadyAdded = false
    for (let i = 0; i < androidManifestJson.elements[0].elements.length; i++) {
        if (androidManifestJson.elements[0].elements[i].name == "uses-permission") {
            if (androidManifestJson.elements[0].elements[i].attributes["android:name"] == "android.permission.ACCESS_FINE_LOCATION") {
                permissionAlreadyAdded = true
                break
            }
        }
    }
    if(permissionAlreadyAdded){
        console.log(`[location-provider] Permission already added.`)
    } else {
        androidManifestJson.elements[0].elements.push({
            "type": "element",
            "name": "uses-permission",
            "attributes": {
                "android:name": "android.permission.ACCESS_FINE_LOCATION"
            }
        })
        let androidManifestXml = json2xml(androidManifestJson)
        fs.writeFileSync(getNativeDir() + "/app/AndroidManifest.xml", androidManifestXml)
    }
    // replace/create AppActivity.java content
    let appActivityData = fs.readFileSync(getExtensionPath() + "/native/android/AppActivity.java")
    console.log(appActivityData.toString())
    console.log(getNativeDir() + "/app/src/main/java/org/cocos2dx/javascript/AppActivity.java")
    fs.writeFileSync(getNativeDir() + "/app/src/com/cocos/game/AppActivity.java", appActivityData);
    // replace/create GPSManager.java content
    let gpsManagerData = fs.readFileSync(getExtensionPath() + "/native/android/GPSManager.java")
    fs.writeFileSync(getNativeDir() + "/app/src/com/cocos/game/GPSManager.java", gpsManagerData);
};
export const unload: BuildHook.unload = async function() {
    console.log(`[location-provider] Unload in builder.`)
};

function getNativeDir() {
    return path.join(Editor.Project.path, 'native/engine', "android");
}

function getExtensionPath() {
    return path.join(Editor.Project.path, 'extensions', "location-provider");
}
