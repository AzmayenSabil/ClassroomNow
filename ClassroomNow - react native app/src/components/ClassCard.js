import React  from "react";
import { Text ,View, StyleSheet } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
const CreateCard = () => {
      
    return(
         
        <Card style={styles.classCard}>
            <Card style={styles.classCard__upper}>
            
        <Card.Title  style={styles.classCard__className}/>
        <Card.Content style={styles.classCard__creatorPhoto}>
          <Button mode="contained" onPress={() => navigation.navigate('ChatHome')}>
            Chat
          </Button>
        </Card.Content>
        </Card>
      </Card>
         
    )
}
export default ClassCard;

const Styles = StyleSheet.create({
    container :{
        alignContent:'center',
        margin:37
    },
    classCard__upper: {
        backgroundColor: '#008d7d',
        height: 90,
        position: relative,
        color: white,
        padding: 10,
        borderBottomWidth: 1
    },
    classCard: {
        width: 300,
        border: 1 ,
        borderRadius: 5,
        overflow: hidden,
        cursor: pointer
      },
    classCard__middle: {
        height: 190,
        borderBottomWidth: 1
      },
    classCard__creatorPhoto: {
        position: absolute,
        right: 5,
        borderRadius: 9999
      },
    classCard__className: {
        fontweight: 600,
        fontsize: 30
      },
    classCard__creatorName: {
        position: absolute,
        bottom: 12,
        fontsize: 15
      },
    classCard__lower: {
        display: flex,
        flexdirection: row-reverse
      }
})