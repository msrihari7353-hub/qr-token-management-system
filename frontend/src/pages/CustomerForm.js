import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';
import './CustomerForm.css';

const CustomerForm = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    notes: '',
    // Corporate fields
    personToMeet: '',
    department: '',
    // Temple fields
    ritualType: '',
    darshanType: '',
    // Hotel fields
    roomType: '',
    numberOfPeople: ''
  });

  useEffect(() => {
    fetchBusinessDetails();
  }, [businessId]);

  const fetchBusinessDetails = async () => {
    try {
      const response = await api.get(`/business/${businessId}`);
      setBusiness(response.data.business);
    } catch (error) {
      console.error('Error fetching business:', error);
      alert('Business not found');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.serviceType) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const additionalData = {};
      
      if (formData.serviceType === 'corporate') {
        additionalData.personToMeet = formData.personToMeet;
        additionalData.department = formData.department;
      } else if (formData.serviceType === 'temple') {
        additionalData.ritualType = formData.ritualType;
        additionalData.darshanType = formData.darshanType;
      } else if (formData.serviceType === 'hotel') {
        additionalData.roomType = formData.roomType;
        additionalData.numberOfPeople = formData.numberOfPeople;
      }

      const response = await api.post('/token/create', {
        businessId,
        name: formData.name,
        phone: formData.phone,
        serviceType: formData.serviceType,
        additionalData,
        notes: formData.notes
      });

      if (response.data.success) {
        navigate('/confirmation', { 
          state: { 
            token: response.data.token,
            businessName: business?.businessName 
          } 
        });
      }
    } catch (error) {
      console.error('Error creating token:', error);
      alert('Failed to create token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-form-container">
      <div className="form-card">
        <div className="form-header">
          <h1>🎫 Get Your Token</h1>
          {business && <p className="business-name">{business.businessName}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXXXXXXX"
              required
            />
          </div>

          <div className="form-group">
            <label>Service Type *</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Select service type</option>
              <option value="corporate">Corporate</option>
              <option value="clinic">Clinic</option>
              <option value="temple">Temple</option>
              <option value="hotel">Hotel</option>
            </select>
          </div>

          {formData.serviceType === 'corporate' && (
            <>
              <div className="form-group">
                <label>Person to Meet</label>
                <input
                  type="text"
                  name="personToMeet"
                  value={formData.personToMeet}
                  onChange={handleChange}
                  placeholder="Enter person's name"
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                />
              </div>
            </>
          )}

          {formData.serviceType === 'temple' && (
            <>
              <div className="form-group">
                <label>Ritual Type</label>
                <input
                  type="text"
                  name="ritualType"
                  value={formData.ritualType}
                  onChange={handleChange}
                  placeholder="e.g., Pooja, Abhishek"
                />
              </div>
              <div className="form-group">
                <label>Darshan Type</label>
                <input
                  type="text"
                  name="darshanType"
                  value={formData.darshanType}
                  onChange={handleChange}
                  placeholder="e.g., General, VIP"
                />
              </div>
            </>
          )}

          {formData.serviceType === 'hotel' && (
            <>
              <div className="form-group">
                <label>Room Type</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                >
                  <option value="">Select room type</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of People</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  placeholder="Enter number of people"
                  min="1"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requirements or notes"
              rows="3"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Generating Token...' : 'Get Token'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;