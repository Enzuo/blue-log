import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'



/**
 *
 * @param {string} pathToDatabaseFile  '../../prisma/dev.db'
 * @param {string} name my.db
 * @returns
 */
async function loadDb(pathToDatabaseFile , name){
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require('../../prisma/dev.db')).uri,
    FileSystem.documentDirectory + 'SQLite/'+name
  );
  return name
}



/**
 *
 * @param {object} module require()
 * @returns {Promise<string>}
 */
const loadModule = async function (module) {
  let asset = Asset.fromModule(module);
  let assetFetched = await fetch(asset.uri);
  let assetContent = await assetFetched.text();
  return assetContent;
}

/**
 *
 * @param {{name:string, module:object}} asset
 * @returns
 */
const loadAsset = async function (asset) {
  let content = await loadModule(asset.module)
  return {name : asset.name, content}
}

/**
 *
 * @param {{name:string, module:object}[]} array array of assets
 * @returns
 */
const loadAll = async function (array) {
  let loadingPromises = array.map(asset => {
    return loadAsset(asset)
  })

  return Promise.all(loadingPromises)
}

export default {
  loadModule,
  loadAsset,
  loadAll,
  loadDb,
}
