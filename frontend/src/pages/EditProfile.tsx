import React from 'react';
import NavBar from '../components/Navbar';

const EditProfile: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main>
        <h1>Edit Profile</h1>
        <p>This is a placeholder for the Edit Profile page.</p>
        <p>Replace this content with your actual Edit Profile layout and components.</p>
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default EditProfile;