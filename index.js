/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // load on demand

dayjs.locale('es'); // use Spanish locale globally
AppRegistry.registerComponent(appName, () => App);
