import React, { useState } from "react";
import '../styles/SupplierForm.css';
import { toast } from "react-toastify";
import { companiesOptions, approvalOptions } from "../dummy_data/pr_data";
import NewSupplierModal from "./NewSupplierModal";

interface ItemRow {
    qty: string;
    unit: string;
    description: string;
    unitPrice: string;
    totalPrice: string;
}

const PurchaseOrderForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [rows, setRows] = useState<ItemRow[]>([{ qty: "", unit: "", description: "", unitPrice: "", totalPrice: "" }]);

    const [formData, setFormData] = useState({
        poNumber: "",
        supplier: "",
        supplierAddress: "",
        poDate: new Date().toISOString().split('T')[0],
        deliveryDate: "",
        paymentTerms: "",
        currency: "PHP",
        notes: "",
        approver: "",
        taxRate: "12"
    });

    const paymentTermsOptions = [
        "Net 30 Days",
        "Net 15 Days",
        "Cash on Delivery",
        "Advance Payment",
        "2/10 Net 30"
    ];

    const currencyOptions = ["PHP", "USD", "EUR", "JPY"];

    const handleRowChange = (index: number, field: keyof ItemRow, value: string) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;

        // Auto-calculate total price when qty or unit price changes
        if (field === "qty" || field === "unitPrice") {
            const qty = parseFloat(updatedRows[index].qty) || 0;
            const unitPrice = parseFloat(updatedRows[index].unitPrice) || 0;
            updatedRows[index].totalPrice = (qty * unitPrice).toFixed(2);
        }

        setRows(updatedRows);
    };

    const canAddRow = () => {
        const lastRow = rows[rows.length - 1];
        return lastRow.qty && lastRow.unit && lastRow.description && lastRow.unitPrice;
    };

    const addRow = () => {
        if (canAddRow()) {
            setRows([...rows, { qty: "", unit: "", description: "", unitPrice: "", totalPrice: "" }]);
        }
    };

    const removeRow = (index: number) => {
        if (rows.length > 1) {
            setRows(rows.filter((_, i) => i !== index));
        }
    };

    const calculateSubtotal = () => {
        return rows.reduce((sum, row) => sum + (parseFloat(row.totalPrice) || 0), 0);
    };

    const calculateTax = () => {
        const subtotal = calculateSubtotal();
        return subtotal * (parseFloat(formData.taxRate) / 100);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Purchase Order submitted:", {
            ...formData, rows, totals: {
                subtotal: calculateSubtotal(),
                tax: calculateTax(),
                total: calculateTotal()
            }
        });
        toast.success("Purchase Order created successfully!");

        // Reset form
        setFormData({
            poNumber: "",
            supplier: "",
            supplierAddress: "",
            poDate: new Date().toISOString().split('T')[0],
            deliveryDate: "",
            paymentTerms: "",
            currency: "PHP",
            notes: "",
            approver: "",
            taxRate: "12"
        });
        setRows([{ qty: "", unit: "", description: "", unitPrice: "", totalPrice: "" }]);
    };

    return (
        <div className="purchase-form-container">
            <form onSubmit={handleSubmit}>
                {/* Basic PO Information */}
                <div className="form-group">
                    <label className="form-label required">PO Number</label>
                    <input
                        type="text"
                        value={31831}
                        onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                        className="form-input"
                        placeholder="Enter PO number"
                        required
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">PO Date</label>
                    <input
                        type="date"
                        value={formData.poDate}
                        onChange={(e) => setFormData({ ...formData, poDate: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <div className="flex items-center justify-between"> <label className="form-label required">Supplier</label> <span className="form-label pr-link cursor-pointer" onClick={() => setIsModalOpen(true)} > Create a new supplier </span> </div>
                    <select
                        value={formData.supplier}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Select supplier</option>
                        {companiesOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label required">Supplier Address</label>
                    <textarea
                        value={formData.supplierAddress}
                        onChange={(e) => setFormData({ ...formData, supplierAddress: e.target.value })}
                        className="form-textarea"
                        placeholder="Enter supplier address"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">Required Delivery Date</label>
                    <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label required">Payment Terms</label>
                    <select
                        value={formData.paymentTerms}
                        onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Select payment terms</option>
                        {paymentTermsOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label required">Currency</label>
                    <select
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        className="form-select"
                        required
                    >
                        {currencyOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label required">Tax Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={formData.taxRate}
                        onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                        className="form-input"
                        placeholder="12"
                        required
                    />
                </div>
                <div className="form-group centered">
                    <label className="form-label required">Approver</label>
                    <select
                        value={formData.approver}
                        onChange={(e) => setFormData({ ...formData, approver: e.target.value })}
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

                {/* Items Section */}
                <div className="articles-section">
                    <div className="articles-header">
                        <label className="form-label required">Items / Products</label>
                        <button
                            type="button"
                            onClick={addRow}
                            disabled={!canAddRow()}
                            className={`add-row-btn ${canAddRow() ? 'enabled' : 'disabled'}`}
                        >
                            Add Item
                        </button>
                    </div>

                    {/* Header row */}
                    <div className="po-items-header">
                        <span>Qty</span>
                        <span>Unit</span>
                        <span>Description</span>
                        <span>Unit Price</span>
                        <span>Total</span>
                        <span>Action</span>
                    </div>

                    {rows.map((row, index) => (
                        <div key={index} className="article-row po-item-row">
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
                                placeholder="Description"
                                value={row.description}
                                onChange={(e) => handleRowChange(index, "description", e.target.value)}
                                className="article-input article"
                                required
                            />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Price"
                                value={row.unitPrice}
                                onChange={(e) => handleRowChange(index, "unitPrice", e.target.value)}
                                className="article-input price"
                                required
                            />
                            <input
                                type="text"
                                value={row.totalPrice}
                                readOnly
                                className="article-input total readonly"
                                placeholder="0.00"
                            />

                            <button
                                type="button"
                                onClick={() => removeRow(index)}
                                className="remove-row-btn"
                                title="Remove item"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* Totals Section */}
                    <div className="po-totals">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>{formData.currency} {calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Tax ({formData.taxRate}%):</span>
                            <span>{formData.currency} {calculateTax().toFixed(2)}</span>
                        </div>
                        <div className="total-row final-total">
                            <span>Total:</span>
                            <span>{formData.currency} {calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group centered">
                    <label className="form-label">Notes / Special Instructions</label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="form-textarea"
                        placeholder="Enter any special notes or instructions (optional)"
                    />
                </div>



                <button type="submit" className="submit-btn">
                    Create Purchase Order
                </button>
            </form>
            <NewSupplierModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(supplierData) => {
                    // Handle saving supplier data
                    console.log('New supplier:', supplierData);
                }}
            />
        </div>
    );
};

export default PurchaseOrderForm;