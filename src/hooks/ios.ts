import { BuildHook } from '../../@types';

export const load: BuildHook.load = async function() {
    console.log(`[location-provider] Load in builder.`);
};

export const onAfterBuild: BuildHook.onAfterBuild = async function(options, result) {
    console.log("[location-provider] " + result.paths.dir);
    console.log(`[location-provider] onAfterBuilds`);
};

export const unload: BuildHook.unload = async function() {
    console.log(`[location-provider] Unload in builder.`);
};
