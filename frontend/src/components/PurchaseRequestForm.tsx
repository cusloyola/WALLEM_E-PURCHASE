import React, { useState } from "react";

interface ArticleRow {
  qty: string;
  unit: string;
  article: string;
}

const PurchaseRequestForm: React.FC = () => {
  const [rows, setRows] = useState<ArticleRow[]>([{ qty: "", unit: "", article: "" }]);

  const [formData, setFormData] = useState({
    requestFor: "Purchase - Quantifiable",
    accountOf: "",
    purpose: "",
    remarks: "",
    requiredBefore: "2026-10-18",
    approval: "JUN",
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
    alert("Form submitted! Check console for data.");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-4 max-w-xl">
      <div>
        <label className="block font-semibold">Request For *</label>
        <select
          value={formData.requestFor}
          onChange={(e) => setFormData({ ...formData, requestFor: e.target.value })}
          className="border p-2 w-full"
        >
          <option>Purchase - Quantifiable</option>
          <option>Purchase - Non-Quantifiable</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">For Account Of *</label>
        <input
          type="text"
          value={formData.accountOf}
          onChange={(e) => setFormData({ ...formData, accountOf: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Purpose / Justification *</label>
        <input
          type="text"
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Any Remarks</label>
        <textarea
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Required Before *</label>
        <input
          type="date"
          value={formData.requiredBefore}
          onChange={(e) => setFormData({ ...formData, requiredBefore: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-semibold">For Approval *</label>
        <select
          value={formData.approval}
          onChange={(e) => setFormData({ ...formData, approval: e.target.value })}
          className="border p-2 w-full"
        >
          <option>JUN</option>
          <option>FEB</option>
          <option>MAR</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Articles / Services *</label>
        {rows.map((row, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Qty"
              value={row.qty}
              onChange={(e) => handleRowChange(index, "qty", e.target.value)}
              className="border p-2 w-1/6"
              required
            />
            <input
              type="text"
              placeholder="Unit"
              value={row.unit}
              onChange={(e) => handleRowChange(index, "unit", e.target.value)}
              className="border p-2 w-1/6"
              required
            />
            <input
              type="text"
              placeholder="Article/Service"
              value={row.article}
              onChange={(e) => handleRowChange(index, "article", e.target.value)}
              className="border p-2 w-2/3"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          disabled={!canAddRow()}
          className={`px-3 py-1 rounded ${
            canAddRow() ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
          }`}
        >
          Add Row
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PurchaseRequestForm;
