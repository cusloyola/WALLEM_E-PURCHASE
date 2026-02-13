import React from 'react';
import NavBar from '../components/Navbar';
import SupplierForm from '../components/SupplierForm';
import { Footer } from '../components/Footer';

const SupplierList: React.FC = () => {
    return (
        <div className="dashboard-layout">
            <NavBar />
            <main>
                <h1>Supplier List</h1>
                <p className="outstanding-pr-subtitle">
                    Edit existing supplier record by filling out the form below.
                </p>
                <SupplierForm />
            </main>
            <Footer />
        </div>
    );
};

export default SupplierList;