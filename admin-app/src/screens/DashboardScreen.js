import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Button, Text, FAB, Chip } from 'react-native-paper';
import api from '../config/api';

const DashboardScreen = ({ route, navigation }) => {
  const { business } = route.params;
  const [tokens, setTokens] = useState({ pending: [], called: [], completed: [] });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/token/business/${business.id}`);
      
      if (response.data.success) {
        const allTokens = response.data.tokens;
        setTokens({
          pending: allTokens.filter(t => t.status === 'pending'),
          called: allTokens.filter(t => t.status === 'called'),
          completed: allTokens.filter(t => t.status === 'completed'),
        });
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCallNext = async () => {
    try {
      const response = await api.post(`/token/call-next/${business.id}`);
      
      if (response.data.success) {
        alert(`Token ${response.data.token.tokenNumber} has been called!`);
        fetchTokens();
      }
    } catch (error) {
      alert(error.response?.data?.error || 'No pending tokens');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTokens();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>{business.businessName}</Title>
        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('QRCode', { businessId: business.id })}
          style={styles.qrButton}
        >
          View QR Code
        </Button>
      </View>

      <View style={styles.stats}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statNumber}>{tokens.pending.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statNumber}>{tokens.called.length}</Text>
            <Text style={styles.statLabel}>Called</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statNumber}>{tokens.completed.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card.Content>
        </Card>
      </View>

      <ScrollView
        style={styles.tokenList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Title style={styles.sectionTitle}>Pending Tokens</Title>
        {tokens.pending.map((token) => (
          <Card 
            key={token.id} 
            style={styles.tokenCard}
            onPress={() => navigation.navigate('TokenDetails', { token })}
          >
            <Card.Content>
              <View style={styles.tokenHeader}>
                <Text style={styles.tokenNumber}>{token.tokenNumber}</Text>
                <Chip mode="outlined">{token.serviceType}</Chip>
              </View>
              <Text style={styles.tokenName}>{token.name}</Text>
              <Text style={styles.tokenPhone}>{token.phone}</Text>
            </Card.Content>
          </Card>
        ))}

        {tokens.pending.length === 0 && (
          <Text style={styles.emptyText}>No pending tokens</Text>
        )}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="phone"
        label="Call Next"
        onPress={handleCallNext}
      />

      <Button
        mode="text"
        onPress={() => navigation.navigate('Analytics', { businessId: business.id })}
        style={styles.analyticsButton}
      >
        View Analytics
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
  },
  qrButton: {
    marginTop: 10,
    borderColor: 'white',
  },
  stats: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#667eea',
  },
  statLabel: {
    textAlign: 'center',
    color: '#666',
  },
  tokenList: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  tokenCard: {
    marginBottom: 10,
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tokenNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
  },
  tokenPhone: {
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: '#667eea',
  },
  analyticsButton: {
    margin: 10,
  },
});

export default DashboardScreen;