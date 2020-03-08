/* Diese Klasse ist die Hauptkomponente der App und verbindet alle benötigten Klassen in einem StackNavigator,
um in der App von Fenster zu Fenster navigieren zu können. Dem StackNavigator hinzugefügte Klassen können in den Props
der Klasse per navigate-Funktion hin-und hernavigieren (siehe LoginScreen, CarouselScreen, ProfileScreen und Trader) 
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './app/LoginScreen.js';
import ProfileScreen from './app/ProfileScreen.js';
import CarouselScreen from './app/CarouselScreen.js';
import Trader from './app/Trader.js';

//Erstellen des StackNavigators
//Die Navigationsleiste oben in der App soll für alle Seiten wegfallen
const MainNavigator = createStackNavigator({
  LoginScreen: {screen: LoginScreen, navigationOptions: {
    header: null,
  }},
 
  Carousel: {screen: CarouselScreen, navigationOptions: {
    header: null,
  }},

  Profile: {screen: ProfileScreen,navigationOptions: {
    header: null,
  }},
  
  Trader: {screen: Trader, navigationOptions: {
    header: null,
  }},


});

const App = createAppContainer(MainNavigator);

export default App;
