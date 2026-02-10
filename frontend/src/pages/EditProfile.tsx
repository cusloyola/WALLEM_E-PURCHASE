import React from 'react';
import NavBar from '../components/Navbar';
import ProfileSecurity from '../components/ProfileSecurity';

const EditProfile: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main>
        <h1>Edit Profile</h1>
        <ProfileSecurity />
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default EditProfile;