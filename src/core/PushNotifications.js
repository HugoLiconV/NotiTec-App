import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';

const PushNotifications = () => {
  useEffect(() => {
    OneSignal.init('fc848fe5-6044-4ca0-80db-301c4c336972');
    OneSignal.setSubscription(true);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('ids', onIds);
    return () => {
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.setSubscription(false);
    };
  });

  function onIds(device) {
    console.log('Device info: ', device);
  }

  function onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  /*
   * React when user has opened a push notification
   */
  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  /*
   * Sync Player ID To our BackEnd
   */
  function registerPlayerId(playerId) {}

  return null;
};

export default PushNotifications;
