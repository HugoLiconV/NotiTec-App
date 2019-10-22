import Snackbar from 'react-native-snackbar';
import {ERROR_COLOR, SUCCESS_COLOR} from '../constants';

export function NotificationService() {
  return {
    showError(title) {
      Snackbar.show({
        title,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: ERROR_COLOR,
        color: '#FFF',
      });
    },
    showSuccess(title) {
      Snackbar.show({
        title,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: SUCCESS_COLOR,
        color: '#FFF',
      });
    },
  };
}
