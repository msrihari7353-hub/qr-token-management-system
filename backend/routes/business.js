const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Get business details
router.get('/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const businessDoc = await db.collection('businesses').doc(businessId).get();

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

// Update services
router.put('/:businessId/services', async (req, res) => {
  try {
    const { businessId } = req.params;
    const { services } = req.body;

    await db.collection('businesses').doc(businessId).update({
      services,
      updatedAt: new Date().toISOString()
    });

    res.json({ success: true, message: 'Services updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;