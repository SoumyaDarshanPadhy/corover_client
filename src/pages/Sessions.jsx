import { useEffect, useState } from "react";
import { getSessions } from "../api/dashboard.api";
import "./Sessions.css";

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSessions();
    }, [page]);

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

    return (
        <div className="sessions-page">
            <div className="page-header">
                <h1>Sessions</h1>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading sessions...</p>
                </div>
            ) : error ? (
                <div className="alert-error">{error}</div>
            ) : sessions.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No sessions found</h3>
                    <p>No active sessions yet</p>
                </div>
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
                                {sessions.map((s) => (
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
                                ))}
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