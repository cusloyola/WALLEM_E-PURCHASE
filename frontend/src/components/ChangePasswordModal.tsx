import React, { useEffect, useRef, useState } from "react";
import "../styles/ChangePasswordModal.css";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onConfirm: (currentPassword: string, newPassword: string) => void;
  onCancel: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
    }
  }, [isOpen]);

  const validate = (): boolean => {
    if (!currentPassword) {
      setError("Enter current password.");
      return false;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return false;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from the current password.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    onConfirm(currentPassword, newPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="change-password-backdrop">
      <div className="change-password-modal" ref={modalRef} role="dialog" aria-modal="true">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit} className="change-password-form">
          <label>
            Current Password
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoFocus
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <label>
            Confirm New Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          {error && <div className="change-password-error">{error}</div>}

          <div className="change-password-actions">
            <button type="button" onClick={onCancel} className="change-password-cancel">
              Cancel
            </button>
            <button
              type="submit"
              className="change-password-confirm"
              onClick={handleSubmit}
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;