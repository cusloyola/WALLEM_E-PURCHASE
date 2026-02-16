import React, { useState } from "react";
import NavBar from "./Navbar";
import "../styles/OutstandingPR.css";
import { pendingPRData, ROWS_PER_PAGE, pprColumns } from "../dummy_data/ppr_data";
import { Link } from "react-router";
import { Footer } from "./Footer";

const PPRTable: React.FC = () => {
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("prNo");
    const [page, setPage] = useState(1);
    const [dateFrom, setDateFrom] = useState("2023-02-02");
    const [dateTo, setDateTo] = useState("2026-02-02");

    const filteredRows = pendingPRData.filter((row) => {
        // Text search filter
        if (search) {
            const value = row[searchBy as keyof typeof row] || "";
            if (!value.toString().toLowerCase().includes(search.toLowerCase())) {
                return false;
            }
        }

        // Date range filter
        const rowDate = new Date(row.dateCreated);
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);

        return rowDate >= fromDate && rowDate <= toDate;
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
    }, [search, searchBy, dateFrom, dateTo]);

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

    const handleRefresh = () => {
        setSearch("");
        setSearchBy("prNo");
        setDateFrom("2023-02-02");
        setDateTo("2026-02-02");
        setPage(1);
    };

    const renderCellContent = (
        row: (typeof pendingPRData)[number],
        col: typeof pprColumns[number]
    ) => {
        const cellValue = row[col.key as keyof typeof row];

        if (col.key === 'prNo') {
            return (
                <Link to={`/view-pr`} className="pr-link outstanding-pr-value">
                    {cellValue}
                </Link>
            );
        }

        return <span className="outstanding-pr-value">{cellValue}</span>;
    };

    return (
        <div className="outstanding-pr-root">
            <NavBar />
            <main className="outstanding-pr-content">
                <header className="outstanding-pr-header">
                    <h1 className="outstanding-pr-title">Pending Purchase Requests</h1>
                    <p className="outstanding-pr-subtitle">
                        View and search pending purchase requests. Use the filters
                        below to refine your results.
                    </p>
                </header>
                <section
                    className="outstanding-pr-toolbar"
                    aria-label="Search and filter"
                >
                    <div className="outstanding-pr-search-group">
                        <label htmlFor="searchBy" className="outstanding-pr-label">
                            Search By:
                        </label>
                        <select
                            id="searchBy"
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value)}
                            className="outstanding-pr-select"
                        >
                            {pprColumns.map((col) => (
                                <option key={col.key} value={col.key}>
                                    {col.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="outstanding-pr-search"
                            placeholder="Type to search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search value"
                        />
                    </div>

                    <div className="outstanding-pr-date-group">
                        <label htmlFor="dateFrom" className="outstanding-pr-label">
                            From:
                        </label>
                        <input
                            type="date"
                            id="dateFrom"
                            className="outstanding-pr-date-input"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                        <label htmlFor="dateTo" className="outstanding-pr-label">
                            To:
                        </label>
                        <input
                            type="date"
                            id="dateTo"
                            className="outstanding-pr-date-input"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                        <button
                            className="outstanding-pr-refresh-btn"
                            onClick={handleRefresh}
                            title="Refresh filters"
                        >
                            Refresh
                        </button>
                    </div>
                </section>

                <section
                    className="outstanding-pr-table-container"
                    aria-label="Outstanding purchase requests"
                >
                    <table className="outstanding-pr-table">
                        <thead>
                            <tr>
                                {pprColumns.map((col) => (
                                    <th key={col.key} data-column-key={col.key}>
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={pprColumns.length}
                                        className="outstanding-pr-no-data"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {paginatedRows.map((row, idx) => (
                                        <tr key={idx}>
                                            {pprColumns.map((col) => (
                                                <td
                                                    key={col.key}
                                                    data-label={col.label}
                                                    data-column-key={col.key}
                                                    className="outstanding-pr-cell"
                                                >
                                                    {renderCellContent(row, col)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
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
            </main>
            <Footer />

        </div>
    );
};

export default PPRTable;
