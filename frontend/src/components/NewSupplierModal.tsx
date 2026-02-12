import React, { useEffect, useRef, useState } from "react";
import "../styles/SupplierModal.css";
import { toast } from "react-toastify";

interface NewSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplierData: SupplierData) => void;
}

interface SupplierData {
  supplierName: string;
  address1: string;
  address2: string;
  phone: string;
  fax: string;
  email: string;
  contactPerson: string;
}

const NewSupplierModal: React.FC<NewSupplierModalProps> = ({ isOpen, onClose, onSave }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const validationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [formData, setFormData] = useState<SupplierData>({
    supplierName: "",
    address1: "",
    address2: "",
    phone: "",
    fax: "",
    email: "",
    contactPerson: ""
  });
  const [errors, setErrors] = useState<Partial<SupplierData>>({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone validation regex (basic format)
  const phoneRegex = /^[+]?[(]?[\d\s\-\(\)]{10,}$/;

  const validateField = (field: keyof SupplierData, value: string): string | null => {
    switch (field) {
      case 'supplierName':
        if (!value.trim()) return 'Supplier name is required';
        if (value.trim().length < 2) return 'Supplier name must be at least 2 characters';
        return null;
      
      case 'address1':
        if (!value.trim()) return 'Primary address is required';
        if (value.trim().length < 5) return 'Address must be at least 5 characters';
        return null;
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        return null;
      
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return null;
      
      case 'fax':
        if (value.trim() && !phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid fax number';
        return null;
      
      case 'contactPerson':
        if (value.trim() && value.trim().length < 2) return 'Contact person name must be at least 2 characters';
        return null;
      
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup timeout on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field: keyof SupplierData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
    
    // Clear previous validation timeout
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }
    
    // Set new timeout for validation (wait for user to stop typing)
    if (value.trim()) {
      validationTimeoutRef.current = setTimeout(() => {
        const error = validateField(field, value);
        if (error) {
          setErrors(prev => ({
            ...prev,
            [field]: error
          }));
        }
      }, 800); // Wait 800ms after user stops typing
    }
  };

  const handleSave = () => {
    // Comprehensive validation
    const newErrors: Partial<SupplierData> = {};
    let hasErrors = false;

    // Validate all required fields
    const fieldsToValidate: (keyof SupplierData)[] = [
      'supplierName', 'address1', 'phone', 'email', 'fax', 'contactPerson'
    ];

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    // Check for duplicate supplier name (basic check)
    if (formData.supplierName.trim().toLowerCase().includes('test')) {
      newErrors.supplierName = 'Supplier name cannot contain "test"';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      toast.error('Please fix all validation errors before submitting');
      return;
    }

    // Additional business logic validation
    if (formData.supplierName.trim() === formData.contactPerson.trim() && formData.contactPerson.trim()) {
      toast.warning('Supplier name and contact person appear to be the same. Please verify.');
    }

    onSave(formData);
    toast.success('Supplier added successfully!');
    
    // Reset form and errors
    setFormData({
      supplierName: "",
      address1: "",
      address2: "",
      phone: "",
      fax: "",
      email: "",
      contactPerson: ""
    });
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    // Reset form and errors on cancel
    setFormData({
      supplierName: "",
      address1: "",
      address2: "",
      phone: "",
      fax: "",
      email: "",
      contactPerson: ""
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="supplier-modal-backdrop">
      <div className="supplier-modal" ref={modalRef}>
        <div className="supplier-modal-header">
          <h2>Add New Supplier</h2>
          <button className="supplier-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="supplier-modal-content">
          <form className="supplier-form">
            <div className="supplier-form-row">
              <div className="supplier-form-group full-width">
                <label className="supplier-form-label required">Supplier Name:</label>
                <input
                  type="text"
                  value={formData.supplierName}
                  onChange={(e) => handleInputChange("supplierName", e.target.value)}
                  className={`supplier-form-input ${errors.supplierName ? 'error' : ''}`}
                  placeholder="Enter supplier name"
                  required
                />
                {errors.supplierName && <span className="supplier-form-error">{errors.supplierName}</span>}
              </div>
            </div>

            <div className="supplier-form-row">
              <div className="supplier-form-group full-width">
                <label className="supplier-form-label required">Address 1:</label>
                <input
                  type="text"
                  value={formData.address1}
                  onChange={(e) => handleInputChange("address1", e.target.value)}
                  className={`supplier-form-input ${errors.address1 ? 'error' : ''}`}
                  placeholder="Enter primary address"
                  required
                />
                {errors.address1 && <span className="supplier-form-error">{errors.address1}</span>}
              </div>
            </div>

            <div className="supplier-form-row">
              <div className="supplier-form-group full-width">
                <label className="supplier-form-label">Address 2:</label>
                <input
                  type="text"
                  value={formData.address2}
                  onChange={(e) => handleInputChange("address2", e.target.value)}
                  className="supplier-form-input"
                  placeholder="Enter secondary address"
                />
              </div>
            </div>

            <div className="supplier-form-row">
              <div className="supplier-form-group">
                <label className="supplier-form-label required">Phone:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`supplier-form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter phone number"
                  required
                />
                {errors.phone && <span className="supplier-form-error">{errors.phone}</span>}
              </div>
              <div className="supplier-form-group">
                <label className="supplier-form-label">Fax:</label>
                <input
                  type="tel"
                  value={formData.fax}
                  onChange={(e) => handleInputChange("fax", e.target.value)}
                  className={`supplier-form-input ${errors.fax ? 'error' : ''}`}
                  placeholder="Enter fax number"
                />
                {errors.fax && <span className="supplier-form-error">{errors.fax}</span>}
              </div>
            </div>

            <div className="supplier-form-row">
              <div className="supplier-form-group full-width">
                <label className="supplier-form-label required">Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`supplier-form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter email address"
                  required
                />
                {errors.email && <span className="supplier-form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="supplier-form-row">
              <div className="supplier-form-group full-width">
                <label className="supplier-form-label">Contact Person:</label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  className={`supplier-form-input ${errors.contactPerson ? 'error' : ''}`}
                  placeholder="Enter contact person name"
                />
                {errors.contactPerson && <span className="supplier-form-error">{errors.contactPerson}</span>}
              </div>
            </div>
          </form>
        </div>

        <div className="supplier-modal-actions">
          <button onClick={handleCancel} className="supplier-modal-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="supplier-modal-save">
            Add Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSupplierModal;