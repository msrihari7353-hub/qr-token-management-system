const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// Generate QR code for business
router.get('/generate/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const qrUrl = `${frontendUrl}/customer/${businessId}`;

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    res.json({
      success: true,
      qrCode: qrCodeDataUrl,
      url: qrUrl
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;