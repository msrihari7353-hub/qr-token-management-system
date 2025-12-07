import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import api from '../config/api';

const TokenDetailsScreen = ({ route, navigation }) => {
  const { token } = route.params;

  const handleComplete = async () => {
    try {
      await api.put(`/token/complete/${token.id}`);
      alert('Token marked as completed');
      navigation.goBack();
    } catch (error) {
      alert('Failed to complete token');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.tokenNumber}>{token.tokenNumber}</Title>
          
          <View style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{token.name}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{token.phone}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Service Type</Text>
            <Text style={styles.value}>{token.serviceType}</Text>
          </View>

          {token.additionalData && Object.keys(token.additionalData).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Additional Information</Text>
              {Object.entries(token.additionalData).map(([key, value]) => (
                <Text key={key} style={styles.additionalInfo}>
                  {key}: {value}
                </Text>
              ))}
            </View>
          )}

          {token.notes && (
            <View style={styles.section}>
              <Text style={styles.label}>Notes</Text>
              <Text style={styles.value}>{token.notes}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.status]}>{token.status.toUpperCase()}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Created At</Text>
            <Text style={styles.value}>
              {new Date(token.createdAt).toLocaleString()}
            </Text>
          </View>

          {token.status === 'called' && (
            <Button
              mode="contained"
              onPress={handleComplete}
              style={styles.button}
            >
              Mark as Completed
            </Button>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  card: {
    marginBottom: 20,
  },
  tokenNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  additionalInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  status: {
    fontWeight: 'bold',
    color: '#667eea',
  },
  button: {
    marginTop: 20,
  },
});

export default TokenDetailsScreen;