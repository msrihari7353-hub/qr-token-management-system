const express = require('express');
const router = express.Router();
const { auth, db } = require('../config/firebase');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, businessName, businessType } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: businessName
    });

    // Create business document
    await db.collection('businesses').doc(userRecord.uid).set({
      businessName,
      businessType,
      email,
      createdAt: new Date().toISOString(),
      services: []
    });

    res.json({
      success: true,
      message: 'Business registered successfully',
      userId: userRecord.uid
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Login (handled by Firebase client SDK)
router.post('/login', async (req, res) => {
  try {
    const { uid } = req.body;
    
    const businessDoc = await db.collection('businesses').doc(uid).get();
    
    if (!businessDoc.exists) {
      return res.status(404).json({ success: false, error: 'Business not found' });
    }

    res.json({
      success: true,
      business: { id: businessDoc.id, ...businessDoc.data() }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;