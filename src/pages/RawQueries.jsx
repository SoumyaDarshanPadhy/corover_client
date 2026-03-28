import { useEffect, useState } from "react";
import { getRawQueries } from "../api/dashboard.api";
import "./RawQueries.css";

export default function RawQueries() {
    const [queries, setQueries] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sessionId, setSessionId] = useState("");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQueries();
    }, [page, sessionId]);

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const res = await getRawQueries(page, 5, sessionId);

            setQueries(res.data.queries);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e?.preventDefault();
        setPage(1);
        setSessionId(input);
    };

    return (
        <div className="queries-page">
            <div className="page-header">
                <h1> Raw Queries</h1>
            </div>

            <div className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="Filter by session ID..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button type="submit" className="search-btn btn btn-primary">
                        Search
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading queries...</p>
                </div>
            ) : queries.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>No queries found</h3>
                    <p>{sessionId ? "No results for your search" : "No queries available"}</p>
                </div>
            ) : (
                <>
                    <div className="table-container">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Session ID</th>
                                    <th>User Message</th>
                                    <th>Bot Reply</th>
                                    <th>Intent</th>
                                    <th>Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {queries.map((q, index) => (
                                    <tr key={index} className="table-row">
                                        <td>
                                            <code className="session-id">{q.sessionId}</code>
                                        </td>
                                        <td>
                                            <div className="message-cell">{q.userMessage}</div>
                                        </td>
                                        <td>
                                            <div className="message-cell">{q.botReply}</div>
                                        </td>
                                        <td>
                                            <span className="intent-badge">{q.intent}</span>
                                        </td>
                                        <td className="time-cell">
                                            {new Date(q.timestamp).toLocaleString()}
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

                        <span className="pagination-info">
                            <strong>{page}</strong> / <strong>{totalPages}</strong>
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