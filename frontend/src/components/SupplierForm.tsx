import React, { useState } from "react";
import '../styles/SupplierForm.css';
import { toast } from "react-toastify";
import { companiesOptions, } from "../dummy_data/pr_data";


interface ArticleRow {
    qty: string;
    unit: string;
    article: string;
}

const SupplierForm: React.FC = () => {
    const [rows, setRows] = useState<ArticleRow[]>([{ qty: "", unit: "", article: "" }]);

    const [formData, setFormData] = useState({
        listofSuppliers: "",
        accreditationNO: "",
        supplierName: "",
        address: "",
        city: "",
        telephoneNo: "",
        faxNo: "",
        emailAddress: "",
        contactPerson: "",
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", { ...formData, rows });
        toast.success("Purchase request submitted successfully!");
        setFormData({
            listofSuppliers: "",
            accreditationNO: "",
            supplierName: "",
            address: "",
            city: "",
            telephoneNo: "",
            faxNo: "",
            emailAddress: "",
            contactPerson: "",
        });
        setRows([{ qty: "", unit: "", article: "" }]);
    };

    return (
        <div className="purchase-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label required">List of Suppliers</label>
                    <select
                        value={formData.listofSuppliers}
                        onChange={(e) => setFormData({ ...formData, listofSuppliers: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Select an option</option>
                        {companiesOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label required">Accreditation Number</label>
                    <input
                        type="text"
                        value={formData.accreditationNO}
                        onChange={(e) => setFormData({ ...formData, accreditationNO: e.target.value })}
                        className="form-input"
                        placeholder="Enter accreditation number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label required">Supplier Name</label>
                    <input
                        type="text"
                        value={formData.supplierName}
                        onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                        className="form-input"
                        placeholder="Enter supplier name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label required">Address</label>
                    <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="form-textarea"
                        placeholder="Enter address"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label required">City</label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="form-input"
                        placeholder="Enter city"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label required">Fax Number</label>
                    <input
                        type="tel"
                        value={formData.faxNo}
                        onChange={(e) => setFormData({ ...formData, faxNo: e.target.value })}
                        className="form-input"
                        placeholder="Enter fax number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label required">Email Address</label>
                    <input
                        type="email"
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        className="form-input"
                        placeholder="Enter email address"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label required">Contact Person</label>
                    <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="form-input"
                        placeholder="Enter contact person"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Submit Supplier Form
                </button>
            </form>
        </div>
    );
};

export default SupplierForm;
