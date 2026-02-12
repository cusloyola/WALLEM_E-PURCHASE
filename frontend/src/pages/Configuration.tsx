import React from 'react';
import NavBar from '../components/Navbar';
import { Archive, UserCog, WalletCards } from 'lucide-react';
import '../styles/Config.css';


const Configuration: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main className="dashboard-content">
        <section>
          <h1>Configuration</h1>
          <p>
            Please select an option.<br />
          </p>
        </section>
        <section className="dashboard-cards">
          <a href="/new-po" className="dashboard-card">
            <WalletCards className="dashboard-card-icon" />
            <span className="dashboard-card-title">Manual Purchase Order</span>
            <span className="dashboard-card-desc">Start a new refund or process pending requests.</span>
          </a>
          <a href="/supplier-list" className="dashboard-card">
            <Archive className="dashboard-card-icon" />
            <span className="dashboard-card-title">Supplier List</span>
            <span className="dashboard-card-desc">Start a new refund or process pending requests.</span>
          </a>
          <a href="/user-rights" className="dashboard-card">
            <UserCog className="dashboard-card-icon" />
            <span className="dashboard-card-title">User Rights</span>
            <span className="dashboard-card-desc">Start a new refund or process pending requests.</span>
          </a>
        </section>
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default Configuration;