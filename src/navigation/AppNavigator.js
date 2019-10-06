import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from '../screens/SplashScreen';
import {
  DETAILS_SCREEN,
  SETTINGS_SCREEN,
  PROFILE_SCREEN,
  SPLASH_SCREEN,
  HOME_SCREEN,
  LOGIN_SCREEN,
  CREATE_ACCOUNT_SCREEN,
  BOOKMARKS_SCREEN,
} from '../constants';
import Details from '../screens/Details';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import CreateAccount from '../screens/CreateAccount';
import Login from '../screens/Login';
import Bookmarks from '../screens/Bookmarks';
import Profile from '../screens/Profile';

const homeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    [DETAILS_SCREEN]: {
      screen: Details,
    },
    [SETTINGS_SCREEN]: {
      screen: Settings,
    },
    [PROFILE_SCREEN]: {
      screen: Profile,
    },
    [BOOKMARKS_SCREEN]: {
      screen: Bookmarks,
    },
  },
  {
    headerMode: 'none',
  },
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      [SPLASH_SCREEN]: SplashScreen,
      [HOME_SCREEN]: homeNavigator,
      [LOGIN_SCREEN]: Login,
      [CREATE_ACCOUNT_SCREEN]: CreateAccount,
    },
    {
      initialRouteName: SPLASH_SCREEN,
    },
  ),
);

export default AppNavigator;
