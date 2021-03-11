/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

import {AppStack} from './src/routes';
import {Platform} from 'react-native';

const App = () => {
  // const [permissions, setPermissions] = useState({});

  /**
   * By calling this function, notification with category `userAction` will have action buttons
   */
  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          {id: 'open', title: 'Open', options: {foreground: true}},
          {
            id: 'ignore',
            title: 'Desruptive',
            options: {foreground: true, destructive: true},
          },
          {
            id: 'text',
            title: 'Text Input',
            options: {foreground: true},
            textInput: {buttonTitle: 'Send'},
          },
        ],
      },
    ]);
  };

  const addNotificationRequest = () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 5);
    PushNotificationIOS.addNotificationRequest({
      id: Math.random() * 1000 + '',
      title: 'rnSignal',
      subtitle: 'Welcome to rnSignal',
      body: 'Signup successfully',
      badge: 69,
      sound: 'bingbong.aiff',
      fireDate: date.toISOString(),

      // id: string;
      // title?: string;
      // subtitle?: string;
      // body?: string;
      // badge?: number;
      // sound?: string;
      // category?: string;
      // threadId?: string;
      // fireDate?: Date;
      // repeats?: boolean;
      // isSilent?: boolean;
      // userInfo?: Record<string, any>;
    });
  };

  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'com.rnsignal', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const localNotification = () => {
    PushNotification.channelExists('com.rnsignal', function (exists) {
      console.log(exists); // true/false
      if (exists) {
        PushNotification.localNotificationSchedule({
          channelId: 'com.rnsignal',
          message: 'My Notification Message', // (required)
          date: new Date(Date.now() + 5 * 1000), // in 60 secs
          allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        });
        return;
        PushNotification.localNotification({
          channelId: 'com.rnsignal',
          ticker: 'My Notification Ticker', // (optional)
          showWhen: true, // (optional) default: true
          autoCancel: true, // (optional) default: true
          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
          largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
          bigText:
            'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
          subText: 'This is a subText', // (optional) default: none
          bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
          bigLargeIcon: 'ic_launcher', // (optional) default: undefined
          bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
          color: 'red', // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          tag: 'some_tag', // (optional) add tag to message
          group: 'group', // (optional) add group to message
          groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
          ongoing: false, // (optional) set whether this is an "ongoing" notification
          priority: 'high', // (optional) set notification priority, default: high
          visibility: 'private', // (optional) set notification visibility, default: private
          ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
          shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
          onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false

          when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
          usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
          timeoutAfter: 300, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

          messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

          // actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
          invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

          /* iOS only properties */
          category: '', // (optional) default: empty string

          /* iOS and Android properties */
          id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          title: 'My Notification Title', // (optional)
          message: 'My Notification Message', // (required)
          userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
      }
    });
  };

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // messaging().onNotificationOpenedApp((remoteMessage) => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigation.navigate(remoteMessage.data.type);
    // });
    // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then((remoteMessage) => {
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage.notification,
    //       );
    //       // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //     }
    //     // setLoading(false);
    //   });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // setNotificationCategories();
      // addNotificationRequest();
      return;
    }

    // createChannel();
    // localNotification();

    PushNotificationIOS.addEventListener('register', (token) => {
      console.log('MyAPNSTOKEN', token);
    });
  }, []);

  useEffect(() => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  });

  const onRemoteNotification = (notification) => {
    console.log(notification);
    const actionIdentifier = notification.getActionIdentifier();

    if (actionIdentifier === 'open') {
      // Perform action based on open action
    }

    if (actionIdentifier === 'text') {
      // Text that of user input.
      const userText = notification.getUserText();
      // Perform action based on textinput action
    }
  };
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
