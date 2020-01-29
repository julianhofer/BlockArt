/*
 * Copyright (c) 2019, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './app/LoginScreen.js';
import ProfileScreen from './app/ProfileScreen.js';
import CarouselScreen from './app/CarouselScreen.js';
import Trader from './app/Trader.js';

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
