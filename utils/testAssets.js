import { Asset } from 'expo';

console.log('test assets loading');




const fetchLocalFile = async () => {
  // let file = Asset.fromModule(require("../assets/test.txt"));
  let file = Asset.fromModule(require("../database/migrations/test.txt"));
  // let fileName = 'test.txt';
  // let file = Asset.fromModule(require(`../database/migrations/${fileName}`));
  await file.downloadAsync(); // Optional, saves file into cache
  file = await fetch(file.uri);
  file = await file.text();

  console.log('got file from assets', file);

  // this.setState({copy: file});
}


fetchLocalFile();



export default function () {
  console.log('coucou');
}
