import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import api from '../config/api';

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'corporate',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!formData.businessName || !formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/signup', formData);
      
      if (response.data.success) {
        alert('Account created successfully! Please login.');
        navigation.navigate('Login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          label="Business Name"
          value={formData.businessName}
          onChangeText={(text) => setFormData({ ...formData, businessName: text })}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Business Type"
          value={formData.businessType}
          onChangeText={(text) => setFormData({ ...formData, businessType: text })}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={handleSignup}
          loading={loading}
          style={styles.button}
        >
          Create Account
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
  },
  error: {
    color: '#ff6b6b',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SignupScreen;