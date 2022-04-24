import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import { ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import {  Menu, Divider, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CreateOrJoinClassScreen ({ navigation })
 {
const [classroom_name, setClassroom_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const storeClass = async (classroom_name) => {
    //AsyncStorage.removeItem("allClasses")
    AsyncStorage.removeItem("className")
    try {
      const jsonValue = JSON.stringify(classroom_name)
      await AsyncStorage.setItem('className', jsonValue)
    } catch (e) {
      // saving error
    }
    getData().then((value)=>{
        console.log(value);
      });
    addClass(classroom_name);
  }
  const getData = async (name) => {
    try {
      
      const value1 = await AsyncStorage.getItem(name).then((value) => {
        value1= value;
    });
      //console.log(JSON.stringify(value))
      if(value !== null) {
        return value1;
      }
    } catch(e) {
      // error reading value
    }
    
    
  }
  const addClass = async (classroom_name) => {
    var thisClass = getData('className');
    var userName = getData('user');
    //thisClass = JSON.stringify(thisClass)
    //userName = JSON.stringify(userName)
    console.log(thisClass);
    console.log(userName);
    //const newClass = {name: thisClass, userName: userName};
    //console.log(newClass);
    //var localList = await AsyncStorage.getItem("allClasses") || "[]";
    //localList = JSON.parse(localList);
    
    //Check repeated ID
    // if(!localList.includes(thisClass))
    // {
    //     console.log("This classroom already exists\n")
    //     AsyncStorage.mergeItem(
    //         'allClasses',
    //         JSON.stringify(thisClass));
    // }
    
    
    //console.log(AsyncStorage.getItem("allClasses"));
    //console.log(getData());
  }
  
   
  return (
    <View style={styles.container}>
        <Title style={styles.titleText}>Create a ClassRoom, Now!</Title>
        <FormInput
            labelName="Name"
            value={classroom_name}
            autoCapitalize="none"
            onChangeText={(classroom_name) => setClassroom_name(classroom_name)}
        />
        <FormButton
            title="Create"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => {storeClass(classroom_name); navigation.navigate('Home')}}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 10
  },
  card: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    marginRight: 5
  },
  row: {
    width: '50%',
    backgroundColor: 'green',
  },
  mainMenuAnchor: {
    width: 24,
    height: 5,
    backgroundColor: 'red',
  },
  menuWrapper: {
    alignSelf: 'flex-end',
    margin: 8,
  }
});

export default CreateOrJoinClassScreen