import {createStackNavigator, createAppContainer} from 'react-navigation';
import Scan from './Scan.js'
import Home from './Home.js'

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Scan: {screen: Scan},
},   {
  initialRouteName: "Home"
});

const App = createAppContainer(MainNavigator);

export default App;