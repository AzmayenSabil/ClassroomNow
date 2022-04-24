import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { View } from 'react-native';
import {  Menu, Divider, Provider } from 'react-native-paper';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

function HomeScreen ({ navigation })
 {
   
  return (
    <ScrollView style={styles.scrollView}>
      <Card>
  <CardImage 
    source={{uri: 'http://placehold.it/480x270'}} 
    title=""
  />
  <CardTitle 
    title="CSE 4499" 
    subtitle="Mr. Jack Ripper"
   />
  <CardContent text="" />
  <CardAction 
    separator={true} 
    inColumn={false}>
    <CardButton
      onPress={() => navigation.navigate('ClassHomeScreen')}
      title="Enter"
      color="blue"
    />
    <CardButton
      onPress={() => {}}
      title="Leave"
      color="blue"
    />
  </CardAction>
</Card>
      
    </ScrollView>
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
  }
});
export default HomeScreen