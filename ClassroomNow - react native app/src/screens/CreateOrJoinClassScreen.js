import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { View } from 'react-native';
import {  Menu, Divider, Provider } from 'react-native-paper';

function CreateOrJoinClassScreen ({ navigation })
 {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
   
  return (
    <ScrollView style={styles.scrollView}>
        <View style={[styles.container]}>
          <View style={[styles.row]}>
          <View style={styles.menuWrapper}>
            
          <Menu.Item icon="redo" onPress={() => {navigation.navigate('CreateClass')}}
           title="Create Class" />
    <Menu.Item icon="undo" onPress={() => {}} title="Join Class" />
            
            </View>
          </View>
        </View>
       <View
        style={{
          paddingTop: 10,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          
        
        
      </View>
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