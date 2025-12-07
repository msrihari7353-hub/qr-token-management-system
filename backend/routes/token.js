const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { sendTokenCreatedSMS, sendTokenCalledSMS } = require('../services/sms');

// Generate token number
const generateTokenNumber = (businessId, count) => {
  const prefix = businessId.substring(0, 3).toUpperCase();
  const number = String(count + 1).padStart(4, '0');
  return `${prefix}-${number}`;
};

// Create new token
router.post('/create', async (req, res) => {
  try {
    const { businessId, name, phone, serviceType, additionalData, notes } = req.body;

    // Get current token count for today
    const today = new Date().toISOString().split('T')[0];
    const tokensSnapshot = await db.collection('tokens')
      .where('businessId', '==', businessId)
      .where('date', '==', today)
      .get();

    const tokenNumber = generateTokenNumber(businessId, tokensSnapshot.size);

    // Create token document
    const tokenData = {
      businessId,
      tokenNumber,
      name,
      phone,
      serviceType,
      additionalData: additionalData || {},
      notes: notes || '',
      status: 'pending',
      date: today,
      createdAt: new Date().toISOString(),
      calledAt: null
    };

    const tokenRef = await db.collection('tokens').add(tokenData);

    // Send SMS
    await sendTokenCreatedSMS(name, phone, tokenNumber);

    res.json({
      success: true,
      token: { id: tokenRef.id, ...tokenData }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get tokens for business
router.get('/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const { status, date } = req.query;

    let query = db.collection('tokens').where('businessId', '==', businessId);

    if (status) {
      query = query.where('status', '==', status);
    }

    if (date) {
      query = query.where('date', '==', date);
    } else {
      const today = new Date().toISOString().split('T')[0];
      query = query.where('date', '==', today);
    }

    const snapshot = await query.orderBy('createdAt', 'asc').get();
    const tokens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json({ success: true, tokens });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Call next token
router.post('/call-next/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const today = new Date().toISOString().split('T')[0];

    // Get next pending token
    const snapshot = await db.collection('tokens')
      .where('businessId', '==', businessId)
      .where('status', '==', 'pending')
      .where('date', '==', today)
      .orderBy('createdAt', 'asc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ success: false, error: 'No pending tokens' });
    }

    const tokenDoc = snapshot.docs[0];
    const tokenData = tokenDoc.data();

    // Update token status
    await tokenDoc.ref.update({
      status: 'called',
      calledAt: new Date().toISOString()
    });

    // Send SMS
    await sendTokenCalledSMS(tokenData.phone, tokenData.tokenNumber);

    res.json({
      success: true,
      token: { id: tokenDoc.id, ...tokenData, status: 'called' }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Complete token
router.put('/complete/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;

    await db.collection('tokens').doc(tokenId).update({
      status: 'completed',
      completedAt: new Date().toISOString()
    });

    res.json({ success: true, message: 'Token completed' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;