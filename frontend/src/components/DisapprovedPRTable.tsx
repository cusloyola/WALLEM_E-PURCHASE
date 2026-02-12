import React, { useState } from "react";
import NavBar from "./Navbar";
import "../styles/OutstandingPR.css";
import { disapprovedPRData, ROWS_PER_PAGE, dprColumns } from "../dummy_data/disapproved_pr_data";
import { Link } from "react-router";

const DisapprovedPRTable: React.FC = () => {
    const [search] = useState("");
    const [searchBy] = useState("prNo");
    const [page, setPage] = useState(1);

    const filteredRows = disapprovedPRData.filter((row) => {
        // Text search filter
        if (search) {
            const value = row[searchBy as keyof typeof row] || "";
            if (!value.toString().toLowerCase().includes(search.toLowerCase())) {
                return false;
            }
        }

        return true;
    });

    const totalPages = Math.ceil(filteredRows.length / ROWS_PER_PAGE) || 1;
    const paginatedRows = filteredRows.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    const goToPage = (p: number) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
    };

    React.useEffect(() => {
        setPage(1);
    }, [search, searchBy]);

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={
                        "outstanding-pr-pagination-page-button" +
                        (i === page ? " active" : "")
                    }
                    onClick={() => goToPage(i)}
                    disabled={i === page}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="outstanding-pr-root">
            <NavBar />
            <main className="outstanding-pr-content">
                <header className="outstanding-pr-header">
                    <h1 className="outstanding-pr-title">Disapproved PR</h1>
                    <p className="outstanding-pr-subtitle">
                        View disapproved purchase requests.
                    </p>
                </header>

                <section
                    className="outstanding-pr-table-container"
                    aria-label="Outstanding purchase requests"
                >
                    <table className="outstanding-pr-table">
                        <thead>
                            <tr>
                                {dprColumns.map((col) => (
                                    <th key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={dprColumns.length}
                                        className="outstanding-pr-no-data"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRows.map((row, idx) => (
                                    <tr key={idx}>
                                        {dprColumns.map((col) => (
                                            <td key={col.key}>
                                                {col.key === 'prNo' ? (
                                                    <Link
                                                        to={`/view-pr`}
                                                        className="pr-link"
                                                    >
                                                        {row[col.key as keyof typeof row]}
                                                    </Link>
                                                ) : col.key === 'poNumber' ? (
                                                    <Link
                                                        to={`/view-po`}
                                                        className="pr-link"
                                                    >
                                                        {row[col.key as keyof typeof row]}
                                                    </Link>
                                                ) : col.key === 'option' && row.option === 'Archive' ? (
                                                    <div className="status-with-action">
                                                        <Link
                                                            to={`/disapproved-pr`}
                                                            className="pr-link"
                                                            style={{
                                                                display: 'block',
                                                            }}
                                                        >
                                                            <span>{row[col.key as keyof typeof row]}</span>
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    row[col.key as keyof typeof row]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>

                <nav
                    className="outstanding-pr-pagination"
                    aria-label="Pagination"
                >
                    <button
                        className="outstanding-pr-pagination-button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <div className="outstanding-pr-pagination-page-numbers">
                        {renderPageNumbers()}
                    </div>
                    <button
                        className="outstanding-pr-pagination-button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </nav>

                <footer className="outstanding-pr-footer">
                    No. of Records: <b>{filteredRows.length}</b>
                </footer>
            </main>
        </div>
    );
};

export default DisapprovedPRTable;
