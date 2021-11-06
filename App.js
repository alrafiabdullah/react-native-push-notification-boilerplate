/*eslint-disable */
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";
import { pushnotification } from "./src/NotificationManger";

const App = () => {
  const handleTouch = () => {
    console.log("Pressed");
    showNotification(1, "App Notification", "Local Notification", { "nice": "cool" });
    // unregister();
  };

  const _buildAndroidNotification = (id, title, message, data) => {
    return {
      id: id,
      channelId: "channel-id",
      autoCancel: false,
      vibrate: true,
      vibration: 300,
      priority: "high",
      importance: "high",
      title: title,
      message: message,
      data: data,
    };
  };

  const showNotification = (id, title, message, data) => {
    if (Platform.OS === "android") {
      PushNotification.localNotification(
        _buildAndroidNotification(id, title, message, data)
      );
    }
  };

  const cancelAllLocalNotifications = () => {
    if (Platform.OS === "android") {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  const unregister = () => {
    PushNotification.unregister();
  };

  useEffect(() => {
    // pushnotification.configure();
    console.log("Loaded");
    PushNotification.configure({
      onRegister: (token) => {
        console.log("TOKEN:", token);
      },
      onNotification: (notification) => {
        console.log("NOTIFICATION:", notification);
      },
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);

  return (
    <View>
      <Text>Hello World</Text>
      <TouchableOpacity onPress={handleTouch}>
        <Text>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
