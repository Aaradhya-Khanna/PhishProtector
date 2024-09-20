import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Frontpage = ({ navigation }) => { // Use destructuring to get navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to call phishing detection API
  const detectPhishing = async () => {
    try {
      const response = await axios.post('https://phiishyemaildetection.onrender.com', {
        email: email,
        password: password
      });

      const result = response.data.emails;
      // Navigate to Result screen and pass the result as a param
      navigation.navigate('PrintResult', { result }); 
    } catch (error) {
      console.error('Error detecting phishing', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phishing Detection</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Detect Phishing" onPress={detectPhishing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    color: 'grey'
  },
  title: {
    fontSize: 24,
    color: "black",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    color: 'black',
    paddingHorizontal: 10
  }
});

export default Frontpage;
