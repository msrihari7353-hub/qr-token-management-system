import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import api from '../config/api';

const QRCodeScreen = ({ route }) => {
  const { businessId } = route.params;
  const [qrCode, setQrCode] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQRCode();
  }, []);

  const fetchQRCode = async () => {
    try {
      const response = await api.get(`/qr/generate/${businessId}`);
      if (response.data.success) {
        setQrCode(response.data.qrCode);
        setUrl(response.data.url);
      }
    } catch (error) {
      console.error('Error fetching QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Generating QR Code...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Your Business QR Code</Title>
          <Text style={styles.subtitle}>
            Customers can scan this QR code to get a token
          </Text>

          {qrCode && (
            <Image
              source={{ uri: qrCode }}
              style={styles.qrImage}
              resizeMode="contain"
            />
          )}

          <Text style={styles.url}>{url}</Text>

          <Text style={styles.instructions}>
            Print this QR code and display it at your business location.
            Customers can scan it with their phone camera to access the token form.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  card: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: '#667eea',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  qrImage: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
  url: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
});

export default QRCodeScreen;