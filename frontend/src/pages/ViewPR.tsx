import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import '../styles/ViewPR.css';

const ViewPR: React.FC = () => {
  const { prNo } = useParams<{ prNo: string }>();

  return (
    <div className="view-pr-root">
      <NavBar />
      <main className="view-pr-content">
        <div className="view-pr-container">
          {/* Header Section */}
          <div className="view-pr-header">
            <div className="view-pr-header-row">
              <div className="view-pr-number">
                <span className="view-pr-label">PR No.</span>
                <span className="view-pr-value highlight">{prNo || '87651'}</span>
              </div>
              <div className="view-pr-approval">
                <span className="view-pr-label">PR Date Approved:</span>
                <span className="view-pr-value">28 Jan 2026 13:07</span>
              </div>
              <div className="view-pr-approver">
                <span className="view-pr-label">Approver Name:</span>
                <span className="view-pr-value">Jun Erandio</span>
              </div>
              <div className="view-pr-date-requested">
                <span className="view-pr-label">Date Requested:</span>
                <span className="view-pr-value">28 Jan 2026 12:51</span>
              </div>
            </div>

          </div>

          {/* Request Info Section */}
          <div className="view-pr-request-info">
            <span className="view-pr-label">Request For</span>
            <span className="view-pr-link">Purchase/Others</span>
            <span className="view-pr-label">Account of</span>
            <span className="view-pr-link">WPSI/MIS TV Box Replacement</span>
          </div>

          {/* Purpose Section */}
          <div className="view-pr-section">
            <div className="view-pr-purpose">
              <div className="view-pr-purpose-header">
                <span /* className="view-pr-section-title" */>Purpose/Justification</span>
              </div>
              <div className="view-pr-purpose-content">
                Replacement of defective TV Box located as 2F Cashier
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="view-pr-section">
            <div className="view-pr-table-container">
              <table className="view-pr-table">
                <thead>
                  <tr>
                    <th>QTY</th>
                    <th>Unit No.</th>
                    <th>Articles/Services</th>
                    <th className="view-pr-note-column">
                      <div className="view-pr-note-header">
                        Required Before:<br />
                        2026-02-28<br />                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>unit</td>
                    <td>X96 mini android player</td>
                    <td className="view-pr-note-cell"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* File Uploads Section */}
          <div className="view-pr-section">
            <div className="view-pr-files">
              <div className="view-pr-file-group">
                <label className="view-pr-file-label">Insert Canvass Sheet:</label>
                <div className="view-pr-file-info">No file chosen</div>
              </div>
              <div className="view-pr-file-group">
                <label className="view-pr-file-label">Quotation:</label>
                <div className="view-pr-file-info">No file chosen</div>
              </div>
            </div>
          </div>

          {/* Approval Section */}
          <div className="view-pr-section">
            <div className="view-pr-approval-section">
              <div className="view-pr-approval-left">
                <div className="view-pr-approval-item">
                  <span className="view-pr-label">Dept Head by </span>
                  <span className="view-pr-value">JUN</span>
                </div>
                <div className="view-pr-signature-box">
                  <input type="text" className="view-pr-signature-input" placeholder="Signature" />
                </div>
              </div>

              <div className="view-pr-approval-center">
                <div className="view-pr-approval-item">
                  <span className="view-pr-label">Rec. Approval by:</span>
                </div>
                <div className="view-pr-signature-box">
                  <textarea className="view-pr-remarks-textarea" placeholder="Remarks"></textarea>
                </div>
              </div>

              <div className="view-pr-approval-right">
                <div className="view-pr-approval-item">
                  <span className="view-pr-label">Requested by: </span>
                  <span className="view-pr-value">JOEY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Remarks */}
          <div className="view-pr-section">
            <div className="view-pr-previous-remarks">
              <label className="view-pr-label">Previous Remarks</label>
              <textarea
                className="view-pr-previous-remarks-textarea"
                placeholder="No previous remarks"
                readOnly
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="view-pr-actions">
            <button className="view-pr-btn view-pr-btn-cancel">Cancel PR</button>
            <button className="view-pr-btn view-pr-btn-submit">Submit</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewPR;