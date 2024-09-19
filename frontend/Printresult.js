import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const PrintResult = ({ result }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (result) {
      if (typeof result === 'string') {
        try {
          setData(JSON.parse(result)); 
        } catch (error) {
          console.error('Failed to parse result:', error);
        }
      } else {
        setData(result); 
      }
    }
  }, [result]);

  return (
    <ScrollView style={styles.scroll}>
      {data.map((item, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.subject}>Subject: {item.subject}</Text>
          <Text style={styles.result}>Result: {item.result}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 10,
  },
  container: {
    padding: 10,
  },
  subject: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  result: {
    fontSize: 12,
    color: 'red',
  },
});

export default PrintResult;
