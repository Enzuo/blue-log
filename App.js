import {createStackNavigator, createAppContainer} from 'react-navigation';
import Scan from './screens/Scan.js'
import Home from './screens/Home.js'

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Scan: {screen: Scan},
},   {
  initialRouteName: "Home"
});

const App = createAppContainer(MainNavigator);

export default App;