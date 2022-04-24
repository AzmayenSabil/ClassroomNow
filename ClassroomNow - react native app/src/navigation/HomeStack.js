import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useEffect } from 'react';
import { Button, IconButton } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

import { kitty } from '../chatkitty';
import BrowseChannelsScreen from '../screens/BrowseChannelsScreen';
import ChatScreen from '../screens/ChatScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';
import ChatHomeScreen from '../screens/ChatHomeScreen';
import HomeScreen from '../screens/HomeScreen';
import ClassHomeScreen from '../screens/ClassHomeScreen';
import CreateOrJoinClassScreen from '../screens/CreateOrJoinClassScreen';
import RoutineScreen from '../routine/RoutineScreen';

import CreateClass from '../screens/CreateClassRoom';
import NoticeBoard from '../noticeboard/NoticeBoard'

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      kitty.updateCurrentUser((user) => {
        user.properties = {
          ...user.properties,
          'expo-push-token': token,
        };

        return user;
      });
    });
  }, []);

  return (
    
      <ModalStack.Navigator mode="modal" headerMode="none">
        <ModalStack.Screen
            name="ChatApp"
            component={withInAppNotification(ChatComponent)}
        />
        <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
      </ModalStack.Navigator>
  );
}

function ChatComponent({ navigation, showNotification }) {
  useEffect(() => {
    return kitty.onNotificationReceived((notification) => {
      showNotification({
        title: notification.title,
        message: notification.body,
        onPress: () => {
          switch (notification.data.type) {
            case 'USER:SENT:MESSAGE':
            case 'SYSTEM:SENT:MESSAGE':
              kitty.getChannel(notification.data.channelId).then((result) => {
                navigation.navigate('Chat', { channel: result.channel });
              });
              break;
          }
        },
      });
    });
  }, [navigation, showNotification]);

  return (
    
      <ChatStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#5b3a70',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
      >
        
        
        <ChatStack.Screen
            name="Home"
            component={HomeScreen}
            options={(options) => ({
              headerRight: () => (
                  <IconButton
                      icon="plus"
                      size={28}
                      color="#ffffff"
                      onPress={() => options.navigation.navigate('CreateOrJoinClass')}
                  />
              ),
            })}
        />
        
         <ChatStack.Screen
            name="ChatHome"
            component={ChatHomeScreen}
            // options={(options) => ({
            //   headerRight: () => (
            //       <IconButton
            //           icon="plus"
            //           size={28}
            //           color="#ffffff"
            //           onPress={() => options.navigation.navigate('BrowseChannels')}
            //       />
            //   ),
            // })}
        /> 
        
        
        <ChatStack.Screen
            name="BrowseChannels"
            component={BrowseChannelsScreen}
            options={(options) => ({
              headerRight: () => (
                  <IconButton
                      icon="plus"
                      size={28}
                      color="#ffffff"
                      onPress={() => options.navigation.navigate('CreateChannel')}
                  />
              ),
            })}
        />
        <ChatStack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({
              title: route.params.channel.name,
            })}
        />
         <ChatStack.Screen
            name="Routine"
            component={RoutineScreen}
            
        /> 
        <ChatStack.Screen
            name="CreateOrJoinClass"
            component={CreateOrJoinClassScreen}
            
        /> 
        <ChatStack.Screen
            name="CreateClass"
            component={CreateClass}
            
        /> 
        <ChatStack.Screen
            name="ClassHomeScreen"
            component={ClassHomeScreen}
            
        /> 
        <ChatStack.Screen
            name="NoticeBoard"
            component={NoticeBoard}
            
        /> 
      </ChatStack.Navigator>

  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice && Platform.OS !== 'web') {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}