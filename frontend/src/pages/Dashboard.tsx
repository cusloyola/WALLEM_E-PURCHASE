import React from 'react';
import NavBar from '../components/Navbar';
import { Archive, UserCog, WalletCards, CheckCircle } from 'lucide-react';
import '../styles/Config.css';

const Dashboard: React.FC = () => {
  const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="dashboard-layout">
      <NavBar />
      <main className="dashboard-content">
        <section>
          <h1>Welcome back Mr/Ms. {userName}!</h1>
          <p>
            Continue where you left off. <br />
          </p>
        </section>
        <section className="dashboard-cards">
          <div className="dashboard-card">
            <WalletCards className="dashboard-card-icon" />
            <span className="dashboard-card-title">Pending PR</span>
            <span className="dashboard-card-desc">24</span>
          </div>
          <div className="dashboard-card">
            <Archive className="dashboard-card-icon" />
            <span className="dashboard-card-title">Outstanding PR</span>
            <span className="dashboard-card-desc">12</span>
          </div>
          <div className="dashboard-card">
            <UserCog className="dashboard-card-icon" />
            <span className="dashboard-card-title">Disapproved PR</span>
            <span className="dashboard-card-desc">3</span>
          </div>
          <div className="dashboard-card">
            <CheckCircle className="dashboard-card-icon" />
            <span className="dashboard-card-title">Approved PR</span>
            <span className="dashboard-card-desc">45</span>
          </div>
        </section>
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default Dashboard;