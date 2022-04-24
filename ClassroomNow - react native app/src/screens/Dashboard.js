import React, { createContext, useState, useEffect } from 'react';
import { Button, Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { useAuthState } from "firebase/auth";
import { auth, db } from "../firebase";
import ClassCard from '../components/ClassCard';
function Dashboard() {
const [user, loading] = useState();
  const [classes, setClasses] = useState([]);
  const fetchClasses = async () => {
    try {
      await db
        .collection("users")
        .where("uid", "==", user.uid)
        .onSnapshot((snapshot) => {
          setClasses(snapshot?.docs[0]?.data()?.enrolledClassrooms);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
 
  return (
      <ScrollView>
        
          <ClassCard>

          </ClassCard>
      </ScrollView>
    
  );
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
export default Dashboard;