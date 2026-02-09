import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <header>
        <h1>E-Purchase</h1>
      </header>
      <main>
        <p>This is a placeholder for the Dashboard page.</p>
        <p>Replace this content with your actual dashboard layout and components.</p>
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default Dashboard;