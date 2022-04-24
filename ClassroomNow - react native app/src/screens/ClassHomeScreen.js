import React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
  

function ClassHomeScreen ({ navigation })
 {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    kitty.getChannels({ filter: { joined: false } }).then((result) => {
      setChannels(result.paginator.items);

      if (loading) {
        setLoading(false);
      }
    });
  }, [isFocused, loading]);

  async function handleJoinChannel(channel) {
    const result = await kitty.joinChannel({ channel: channel });

    navigation.navigate('Chat', { channel: result.channel });
  }
  const autoJoin = (chanellName) => {
    item = findObjectByKey(channels, 'name', chanellName);
    handleJoinChannel(item);
  }

  if (loading) {
    return <Loading />;
  } 

  return (
    <ScrollView style={styles.scrollView}>
      <Card style={styles.card}>
        <Card.Title  />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate('ChatHome')}>
            Chat
          </Button>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title  />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate('Routine')}>
            Routine
          </Button>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title  />
        <Card.Content>
          <Button mode="contained" onPress={() => navigation.navigate('NoticeBoard')}>
            Notice Board
          </Button>
        </Card.Content>
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

export default ClassHomeScreen