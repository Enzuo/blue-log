import { FileSystem } from 'expo';
import { Share, CameraRoll } from 'react-native';

import database from '../database';

export const shareDatabase = async () => {
  // const urlToYourFile = `${FileSystem.documentDirectory}SQLite/db.db`
  // const { uri } = await FileSystem.downloadAsync(
  //   urlToYourFile,
  //   FileSystem.documentDirectory + `test.db`
  // );
  const currentDbName = database.getName();
  const uri = `${FileSystem.documentDirectory}SQLite/${currentDbName}`;
  console.log('uri', uri)
  // try {
  //   Share.share({
  //     url: uri,
  //     title: 'title share',
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
  // https://forums.expo.io/t/how-to-save-the-file-to-devices-folder-like-download/2398/19
  CameraRoll.saveToCameraRoll( uri, 'photo');
}

export default { shareDatabase };
