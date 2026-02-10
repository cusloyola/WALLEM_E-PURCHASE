import React, { useState } from "react";
import '../styles/PurchaseRequestForm.css';
import { toast } from "react-toastify";


interface ArticleRow {
    qty: string;
    unit: string;
    article: string;
}

const requestForOptions = ["Purchase - Quantifiable", "Vessel Service - Quantifiable", "Office Supplies - Quantifiable", "SOC Feeder/Co-loader - Quantifiable", "Company Car - Quantifiable", "Job Order - NonQuantifiable", "Trucking Services - Quantifiable", "Chassis Leasing - NonQuantifiable", "Pro Tank Frt Charges - NonQuantifiable", "Others - NonQuantifiable",];
const accountOfOptions = ["Principal/Vessel", "TAD", "CLAD", "WPSI/Accounting", "WPSI/Admin", "WPSI/HR", "WPSI/Operations", "WPSI/MIS", "WPSI/Legal", "WPSI/Purchasing", "WPSI"];
const approvalOptions = ["JUN", "LAY", "PCV", "JRC", "ANC", "JEFF", "JLV", "EDU", "MAM", "LAS", "MRC"];


const PurchaseRequestForm: React.FC = () => {
    const [rows, setRows] = useState<ArticleRow[]>([{ qty: "", unit: "", article: "" }]);

    const [formData, setFormData] = useState({
        requestFor: "",
        accountOf: "",
        purpose: "",
        remarks: "",
        requiredBefore: "2026-10-18",
        approval: "Select approver",
    });

    const handleRowChange = (index: number, field: keyof ArticleRow, value: string) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const canAddRow = () => {
        const lastRow = rows[rows.length - 1];
        return lastRow.qty && lastRow.unit && lastRow.article;
    };

    const addRow = () => {
        if (canAddRow()) {
            setRows([...rows, { qty: "", unit: "", article: "" }]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", { ...formData, rows });
        toast.success("Form submitted! Check console for data.");
        setFormData({
            requestFor: "",
            accountOf: "",
            purpose: "",
            remarks: "",
            requiredBefore: "2026-10-18",
            approval: "Select approver",
        });
        setRows([{ qty: "", unit: "", article: "" }]);
    };

    return (
        <div className="purchase-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label required">Request For</label>
                    <select
                        value={formData.requestFor}
                        onChange={(e) => setFormData({ ...formData, requestFor: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Select an option</option>
                        {requestForOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label required">For Account Of</label>
                    <select
                        value={formData.accountOf}
                        onChange={(e) => setFormData({ ...formData, accountOf: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Please Choose</option>
                        {accountOfOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label required">Purpose / Justification</label>
                    <textarea
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="form-textarea"
                        placeholder="Enter purpose and justification"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Any Remarks</label>
                    <textarea
                        value={formData.remarks}
                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                        className="form-textarea"
                        placeholder="Enter any additional remarks (optional)"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">Required Before</label>
                    <input
                        type="date"
                        value={formData.requiredBefore}
                        onChange={(e) => setFormData({ ...formData, requiredBefore: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">For Approval</label>
                    <select
                        value={formData.approval}
                        onChange={(e) => setFormData({ ...formData, approval: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Select approver</option>
                        {approvalOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="articles-section">
                    <div className="articles-header">
                        <label className="form-label required">Articles / Services</label>
                        <button
                            type="button"
                            onClick={addRow}
                            disabled={!canAddRow()}
                            className={`add-row-btn ${canAddRow() ? 'enabled' : 'disabled'}`}
                        >
                            Add Row
                        </button>
                    </div>
                    {rows.map((row, index) => (
                        <div key={index} className="article-row">
                            <input
                                type="text"
                                placeholder="Qty"
                                value={row.qty}
                                onChange={(e) => handleRowChange(index, "qty", e.target.value)}
                                className="article-input qty"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Unit"
                                value={row.unit}
                                onChange={(e) => handleRowChange(index, "unit", e.target.value)}
                                className="article-input unit"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Article/Service"
                                value={row.article}
                                onChange={(e) => handleRowChange(index, "article", e.target.value)}
                                className="article-input article"
                                required
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-btn">
                    Submit Purchase Request
                </button>
            </form>
        </div>
    );
};

export default PurchaseRequestForm;
