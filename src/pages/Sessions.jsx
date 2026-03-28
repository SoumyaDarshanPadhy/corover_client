import { useEffect, useState } from "react";
import { getSessions, searchSessions } from "../api/dashboard.api";
import "./Sessions.css";

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim()) {
                handleSearch();
            } else {
                fetchSessions();
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [page, searchTerm]);

    const fetchSessions = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await getSessions(page, 5);

            setSessions(res.data.sessions);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            setError("Failed to load sessions");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await searchSessions(searchTerm, page, 5);

            setSessions(res.data.sessions);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            setError("Failed to search sessions");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // reset page only if needed
        if (page !== 1) setPage(1);
    };

    return (
        <div className="sessions-page">
            <div className="page-header">
                <h1>Sessions</h1>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search sessions by ID..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading sessions...</p>
                </div>
            ) : error ? (
                <div className="alert-error">{error}</div>
            ) : (
                <>
                    <div className="table-container">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Session</th>
                                    <th>Messages</th>
                                    <th>Start</th>
                                    <th>Last Active</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sessions.length > 0 ? (
                                    sessions.map((s) => (
                                        <tr key={s.sessionId}>
                                            <td>
                                                <code className="session-id">
                                                    {s.sessionId}
                                                </code>
                                            </td>

                                            <td>
                                                <span className="badge">
                                                    {s.messageCount}
                                                </span>
                                            </td>

                                            <td>
                                                {new Date(s.startTime).toLocaleString()}
                                            </td>

                                            <td>
                                                {new Date(s.lastActivity).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="no-results">
                                            {searchTerm
                                                ? "No sessions match your search"
                                                : "No sessions found"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            ←
                        </button>

                        <span>
                            {page} / {totalPages}
                        </span>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}