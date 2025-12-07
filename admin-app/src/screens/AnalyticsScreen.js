import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import api from '../config/api';

const AnalyticsScreen = ({ route }) => {
  const { businessId } = route.params;
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(`/analytics/${businessId}`);
      if (response.data.success) {
        setAnalytics(response.data.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <View style={styles.container}>
        <Text>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Today's Overview</Title>
          <Text style={styles.date}>{analytics.date}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.statNumber}>{analytics.totalCustomers}</Text>
          <Text style={styles.statLabel}>Total Customers</Text>
        </Card.Content>
      </Card>

      <View style={styles.row}>
        <Card style={[styles.card, styles.halfCard]}>
          <Card.Content>
            <Text style={styles.statNumber}>{analytics.completedCustomers}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.halfCard]}>
          <Card.Content>
            <Text style={styles.statNumber}>{analytics.pendingCustomers}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.statNumber}>{analytics.averageWaitTime} min</Text>
          <Text style={styles.statLabel}>Average Wait Time</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.statNumber}>{analytics.peakHour}</Text>
          <Text style={styles.statLabel}>Peak Hour</Text>
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
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    flex: 1,
    marginHorizontal: 5,
  },
  date: {
    color: '#666',
    marginTop: 5,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
  statLabel: {
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },
});

export default AnalyticsScreen;