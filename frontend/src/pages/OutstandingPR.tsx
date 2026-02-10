import React from 'react';
import NavBar from '../components/Navbar';

const OutstandingPR: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
{/*       <header>
        <h1>E-Purchase</h1>
      </header> */}
      <main>
        <h1>Outstanding Purchase Requests</h1>
        <p>This is a placeholder for the Outstanding PR page.</p>
        <p>Replace this content with your actual outstanding PR layout and components.</p>
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default OutstandingPR;