import React from "react";
import NavBar from '../components/Navbar';
import PurchaseRequestForm from "../components/PurchaseRequestForm";
const NewPR: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      {/*       <header>
        <h1>E-Purchase</h1>
      </header> */}
      <main>
        <h1>New Purchase Request</h1>
        <PurchaseRequestForm />
      </main>
      {/*       <footer>
        <small>© {new Date().getFullYear()} Wallem Philippines Shipping Inc.</small>
      </footer> */}
    </div>
  );
};

export default NewPR;