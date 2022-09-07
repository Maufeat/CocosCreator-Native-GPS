"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.load = void 0;
const load = async function () {
    console.log(`[location-provider] Load in builder.`);
};
exports.load = load;
const onAfterBuild = async function (options, result) {
    console.log("[location-provider] " + result.paths.dir);
    console.log(`[location-provider] onAfterBuilds`);
};
exports.onAfterBuild = onAfterBuild;
const unload = async function () {
    console.log(`[location-provider] Unload in builder.`);
};
exports.unload = unload;
