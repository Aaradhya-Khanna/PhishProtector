import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const PrintResult = ({ route }) => {
  const { result } = route.params; // Access the result passed from Frontpage

  return (
    <ScrollView style={styles.scroll}>
      {result && result.length > 0 ? (
        result.map((item, index) => (
          <View key={index} style={styles.container}>
            <Text style={styles.subject}>Subject: {item.subject}</Text>
            <Text style={styles.result}>Result: {item.result}</Text>
          </View>
        ))
      ) : (
        <Text>No results found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: 10,
  },
  container: {
    padding: 10,
    color:'grey'
  },
  subject: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  result: {
    fontSize: 15,
    color: 'red',
  },
});

export default PrintResult;
