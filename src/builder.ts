
import { BuildPlugin } from '../@types';

export const load: BuildPlugin.load = function() {
    console.debug('[location-provider:build] load');
};

export const unload: BuildPlugin.load = function() {
    console.debug('[location-provider:build] unload');
};

export const configs: BuildPlugin.Configs = {
    'android': {
        hooks: './hooks/android'
    },
    'ios': {
        hooks: './hooks/ios'
    }
};
