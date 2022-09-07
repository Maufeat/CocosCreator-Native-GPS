"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.unload = exports.load = void 0;
const load = function () {
    console.debug('[location-provider:build] load');
};
exports.load = load;
const unload = function () {
    console.debug('[location-provider:build] unload');
};
exports.unload = unload;
exports.configs = {
    'android': {
        hooks: './hooks/android'
    },
    'ios': {
        hooks: './hooks/ios'
    }
};
