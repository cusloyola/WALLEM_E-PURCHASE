import React from 'react';
import NavBar from '../components/Navbar';

const ManualPR: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main>
        <h1>Manual PR</h1>
        <p>This is a placeholder for the Manual PR page.</p>
        <p>Replace this content with your actual layout and components.</p>
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default ManualPR;