/*eslint-disable */

import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";

class NotificationManager {
    configure = () => {
        PushNotification.configure({
            onRegister: (token) => {
                console.log("TOKEN:", token);
            },
            onNotification: (notification) => {
                console.log("NOTIFICATION:", notification);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    };

    // PushNotification.localNotification({
    //   title: "My Notification Title",
    //   message: "My Notification Message",
    //   playSound: false,
    //   soundName: "default",
    //   vibrate: true,
    //   vibration: 300,
    //   actions:
    //     "[" +
    //     JSON.stringify({
    //       id: "yes",
    //       title: "Yes",
    //     }) +
    //     "," +
    //     JSON.stringify({
    //       id: "no",
    //       title: "No",
    //     }) +
    //     "]",
    // });

    // PushNotification.localNotificationSchedule({
    //   title: "My Notification Title",
    //   message: "My Notification Message",
    //   playSound: false,
    //   soundName: "default",
    //   vibrate: true,
    //   vibration: 300,
    //   actions:
    //     "[" +
    //     JSON.stringify({
    //       id: "yes",
    //       title: "Yes",
    //     }) +
    //     "," +
    //     JSON.stringify({
    //       id: "no",
    //       title: "No",
    //     }) +
    //     "]",
    //   date: new Date(Date.now() + 10000),
    // });

    // PushNotification.cancelLocalNotifications({ id: "yes" });

    // PushNotification.cancelAllLocalNotifications();

    // PushNotification.getApplicationIconBadgeNumber(function (number) {
    //   console.log("cancelAllLocalNotifications", number);
    // });

    // PushNotification.setApplicationIconBadgeNumber(function (number) {
    //   console.log("setApplicationIconBadgeNumber", number);
    // });

    _buildAndroidNotification = (id, title, message, data) => {
        return {
            id: id,
            autoCancel: true,
            vibrate: true,
            vibration: 300,
            priority: "high",
            importance: "high",
            title: title,
            message: message,
            data: data,
        };
    };

    _buildIOSNotification = (id, title, message, data) => {
        return {
            alertTitle: title,
            alertBody: message,
            userInfo: data,
            soundName: "default",
            category: "yes",
            actions: [
                {
                    id: "yes",
                    title: "Yes",
                },
                {
                    id: "no",
                    title: "No",
                },
            ],
        };
    };

    showNotification = (id, title, message, data) => {
        if (Platform.OS === "android") {
            PushNotification.localNotification(
                _buildAndroidNotification(id, title, message, data)
            );
        }
    };

    cancelAllLocalNotifications = () => {
        if (Platform.OS === "android") {
            PushNotification.cancelAllLocalNotifications();
        }
    };

    unregister = () => {
        PushNotification.unregister();
    };
};

export const notificationManager = new NotificationManager();
