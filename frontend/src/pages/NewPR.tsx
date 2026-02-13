import React from "react";
import NavBar from '../components/Navbar';
import PurchaseRequestForm from "../components/PurchaseRequestForm";
import { Footer } from "../components/Footer";
const NewPR: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main>
        <h1>New Purchase Request</h1>
        <p className="outstanding-pr-subtitle">
          Create a new purchase request by filling out the form below.
        </p>
        <PurchaseRequestForm />
      </main>
      <Footer />

    </div>
  );
};

export default NewPR;