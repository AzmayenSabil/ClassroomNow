import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card } from 'react-native-paper';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { mapIndexToData, Item } from "../utils"

const NUM_ITEMS = 2;
global.count = 1;

const initialData: Item[] = [...Array(NUM_ITEMS)].map(mapIndexToData);
 function fillTexts(item) {
  if(item.text === '0')
      item.text = 'Welcome to the notice Board.\n You may start posting all important notices here';
  else if(item.text === '1')
    item.text = 'We have a quiz on friday';
}

export default function Basic() {
  const [data, setData] = useState(initialData);


  
  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    fillTexts(item);
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : item.backgroundColor },
          ]}
        >
          { <Text style={styles.text}>{item.text}</Text> }
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});