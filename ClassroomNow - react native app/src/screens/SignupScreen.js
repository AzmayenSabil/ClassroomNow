import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);
  //stroing DisplayName to local
  const storeData = async (value) => {
    console.log("This is value: "+value+"/n")
    try {
      AsyncStorage.removeItem("user")
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      // saving error
    }
    console.log(getData());
  }
  const getData = async () => {
    try {
      
      const value = await AsyncStorage.getItem('user')
      console.log(JSON.stringify(value))
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Let's get started!</Title>
        <FormInput
            labelName="Display Name"
            value={displayName}
            autoCapitalize="none"
            onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
        />
        <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <FormButton
            title="Signup"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => {register(displayName, email, password); storeData(displayName);}}
        />
        <IconButton
            icon="keyboard-backspace"
            size={30}
            style={styles.navButton}
            color="#5b3a70"
            onPress={() => navigation.goBack()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});