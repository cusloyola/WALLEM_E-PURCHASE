import React from 'react';
import NavBar from '../components/Navbar';
import PurchaseOrderForm from '../components/PurchaseOrderForm';

const NewPO: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main>
        <h1>Manual Purchase Order</h1>
        <p className="outstanding-pr-subtitle">
          Create a new purchase order by filling out the form below.
        </p>
        <PurchaseOrderForm />
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer>
    </div>
  );
};

export default NewPO;