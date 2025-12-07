const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Get analytics for business
router.get('/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];

    // Get all tokens for the date
    const snapshot = await db.collection('tokens')
      .where('businessId', '==', businessId)
      .where('date', '==', targetDate)
      .get();

    const tokens = snapshot.docs.map(doc => doc.data());

    // Calculate metrics
    const totalCustomers = tokens.length;
    const completedCustomers = tokens.filter(t => t.status === 'completed').length;
    const pendingCustomers = tokens.filter(t => t.status === 'pending').length;
    const calledCustomers = tokens.filter(t => t.status === 'called').length;

    // Calculate average waiting time
    let totalWaitTime = 0;
    let waitTimeCount = 0;

    tokens.forEach(token => {
      if (token.calledAt && token.createdAt) {
        const created = new Date(token.createdAt);
        const called = new Date(token.calledAt);
        const waitTime = (called - created) / 1000 / 60; // minutes
        totalWaitTime += waitTime;
        waitTimeCount++;
      }
    });

    const averageWaitTime = waitTimeCount > 0 ? Math.round(totalWaitTime / waitTimeCount) : 0;

    // Peak hours analysis
    const hourCounts = {};
    tokens.forEach(token => {
      const hour = new Date(token.createdAt).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const peakHour = Object.keys(hourCounts).reduce((a, b) => 
      hourCounts[a] > hourCounts[b] ? a : b, 0
    );

    res.json({
      success: true,
      analytics: {
        date: targetDate,
        totalCustomers,
        completedCustomers,
        pendingCustomers,
        calledCustomers,
        averageWaitTime,
        peakHour: `${peakHour}:00`,
        hourlyDistribution: hourCounts
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;