import { Asset } from 'expo-asset'

export default {
  loadAsset : async function (module) {
    let asset = Asset.fromModule(module);
    let assetFetched = await fetch(asset.uri);
    let assetContent = await assetFetched.text();
    return assetContent;
  }
}
