import React from 'react';
import NavBar from '../components/Navbar';
import UserRightsForm from '../components/UserRightsForm';

const UserRights: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main>
        <h1>User Rights</h1>
        <p>Edit user rights by changing the user type for each user.</p>
        <UserRightsForm />
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default UserRights;