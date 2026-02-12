import React, { useState } from "react";
import '../styles/SupplierForm.css';
import { toast } from "react-toastify";
import { userOptions, userTypes } from "../dummy_data/dummy_users_data";


const UserRightsForm: React.FC = () => {

    const [formData, setFormData] = useState({
        listofUsers: "",
        name: "",
        userType: "",
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", { ...formData });
        toast.success("User rights updated successfully!");
        setFormData({
            listofUsers: "",
            name: "",
            userType: "",
        });
    };

    return (
        <div className="purchase-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label required">List of Users</label>
                    <select
                        value={formData.listofUsers}
                        onChange={(e) => setFormData({ ...formData, listofUsers: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Select an option</option>
                        {userOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label required">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                        placeholder="Enter name"
                        required
                    />
                </div>
                <div className="form-group centered">
                    <label className="form-label required">User Type</label>
                    <select
                        value={formData.userType}
                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Select an option</option>
                        {userTypes.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-btn">
                    Submit Form
                </button>
            </form>
        </div>
    );
};

export default UserRightsForm;