import React, { useState } from 'react';

export default function Profile() {
  const [patientData, setPatientData] = useState({
    fullName: 'John Doe',
    registerAs: 'Patient',
    email: 'john.doe@example.com',
    phone: '‪+91 9876543210‬',
    dateOfBirth: '15-03-1990',
    gender: 'Male',
    address: '123 Main Street, Jaipur, Rajasthan, India'
  });

  const [assignedDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Raj Patel', specialty: 'General Physician' },
    { id: 3, name: 'Dr. Emily Johnson', specialty: 'Dermatologist' }
  ]);

  const [isEditing, setIsEditing] = useState({
    phone: false,
    email: false,
    address: false
  });

  const [editValues, setEditValues] = useState({
    phone: patientData.phone,
    email: patientData.email,
    address: patientData.address
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
    setEditValues({ ...editValues, [field]: patientData[field] });
  };

  const handleSave = (field) => {
    setPatientData({ ...patientData, [field]: editValues[field] });
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleCancel = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    setEditValues({ ...editValues, [field]: patientData[field] });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  return (
    <>
      <style>{`
        .profile-container {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 20px;
        }

        .profile-main-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .profile-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 24px;
          margin-bottom: 20px;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          background-color: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: bold;
        }

        .profile-title {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          margin: 0 0 4px 0;
        }

        .profile-subtitle {
          color: #666;
          margin: 0;
        }

        .logout-button {
          padding: 10px 20px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
        }

        .logout-button:hover {
          background-color: #dc2626;
        }

        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 16px;
          margin-top: 0;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background-color: #f9fafb;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }

        .info-value {
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }

        .info-input {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 4px;
          box-sizing: border-box;
        }

        .info-textarea {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 4px;
          resize: vertical;
          box-sizing: border-box;
          font-family: inherit;
        }

        .button-group {
          display: flex;
          gap: 8px;
        }

        .edit-button {
          padding: 6px 12px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background-color 0.3s;
        }

        .edit-button:hover {
          background-color: #2563eb;
        }

        .save-button {
          padding: 6px 12px;
          background-color: #22c55e;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background-color 0.3s;
        }

        .save-button:hover {
          background-color: #16a34a;
        }

        .cancel-button {
          padding: 6px 12px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background-color 0.3s;
        }

        .cancel-button:hover {
          background-color: #dc2626;
        }

        .doctor-item {
          display: flex;
          align-items: center;
          padding: 16px;
          background-color: #f9fafb;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .doctor-avatar {
          width: 48px;
          height: 48px;
          background-color: #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 12px;
        }

        .doctor-name {
          font-size: 16px;
          font-weight: 500;
          color: #333;
          margin: 0 0 4px 0;
        }

        .doctor-specialty {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .password-form {
          margin-top: 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }

        .form-input {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .primary-button {
          padding: 10px 24px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          margin-right: 8px;
          transition: background-color 0.3s;
        }

        .primary-button:hover {
          background-color: #2563eb;
        }

        .secondary-button {
          padding: 10px 24px;
          background-color: #e5e7eb;
          color: #333;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
        }

        .secondary-button:hover {
          background-color: #d1d5db;
        }
      `}</style>
      
      <div className="profile-container">
        <div className="profile-main-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-section">
                <div className="profile-avatar">
                  {patientData.fullName.charAt(0)}
                </div>
                <div>
                  <h1 className="profile-title">{patientData.fullName}</h1>
                  <p className="profile-subtitle">{patientData.registerAs}</p>
                </div>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="profile-card">
            <h2 className="section-title">Personal Information</h2>
            
            <div className="info-item">
              <div className="info-content">
                <div className="info-label">Email Address</div>
                {isEditing.email ? (
                  <input
                    type="email"
                    value={editValues.email}
                    onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{patientData.email}</div>
                )}
              </div>
              <div className="button-group">
                {isEditing.email ? (
                  <>
                    <button className="save-button" onClick={() => handleSave('email')}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={() => handleCancel('email')}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="edit-button" onClick={() => handleEdit('email')}>
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="info-item">
              <div className="info-content">
                <div className="info-label">Phone Number</div>
                {isEditing.phone ? (
                  <input
                    type="tel"
                    value={editValues.phone}
                    onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{patientData.phone}</div>
                )}
              </div>
              <div className="button-group">
                {isEditing.phone ? (
                  <>
                    <button className="save-button" onClick={() => handleSave('phone')}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={() => handleCancel('phone')}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="edit-button" onClick={() => handleEdit('phone')}>
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="info-item">
              <div className="info-content">
                <div className="info-label">Date of Birth</div>
                <div className="info-value">{patientData.dateOfBirth}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-content">
                <div className="info-label">Gender</div>
                <div className="info-value">{patientData.gender}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-content">
                <div className="info-label">Address</div>
                {isEditing.address ? (
                  <textarea
                    value={editValues.address}
                    onChange={(e) => setEditValues({ ...editValues, address: e.target.value })}
                    className="info-textarea"
                    rows="2"
                  />
                ) : (
                  <div className="info-value">{patientData.address}</div>
                )}
              </div>
              <div className="button-group">
                {isEditing.address ? (
                  <>
                    <button className="save-button" onClick={() => handleSave('address')}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={() => handleCancel('address')}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="edit-button" onClick={() => handleEdit('address')}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h2 className="section-title">Assigned Doctors</h2>
            
            {assignedDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-item">
                <div className="doctor-avatar">
                  {doctor.name.split(' ')[1].charAt(0)}
                </div>
                <div>
                  <p className="doctor-name">{doctor.name}</p>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="profile-card">
            <h2 className="section-title">Security</h2>
            
            {!showChangePassword ? (
              <button className="primary-button" onClick={() => setShowChangePassword(true)}>
                Change Password
              </button>
            ) : (
              <div className="password-form">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <button className="primary-button" onClick={handleChangePassword}>
                    Save Password
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}