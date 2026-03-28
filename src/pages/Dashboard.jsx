import { useEffect, useState } from "react";
import { getStats } from "../api/dashboard.api";
import {
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await getStats();
            setStats(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-spinner">
                    <div className="spinner-dot"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="dashboard">
                <div className="alert alert-error">Failed to load dashboard data</div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                </div>
                <button className="refresh-btn btn btn-primary" onClick={fetchStats}>
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon stat-icon-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Messages</p>
                        <h3 className="stat-value">{stats.totalMessages.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon stat-icon-purple">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Sessions</p>
                        <h3 className="stat-value">{stats.totalSessions.toLocaleString()}</h3>
                    </div>
                </div>

            </div>

            {/* Chart Section */}
            <div className="chart-section">
                <div className="section-header">
                    <h2>Messages Per Day</h2>
                    <span className="badge badge-primary">Last 30 Days</span>
                </div>

                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={stats.messagesPerDay}>
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

                            <XAxis
                                dataKey="date"
                                stroke="#9ca3af"
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                stroke="#9ca3af"
                                tick={{ fontSize: 12 }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#111827",
                                    border: "none",
                                    borderRadius: "10px",
                                    color: "#fff",
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                                }}
                                labelStyle={{ color: "#9ca3af" }}
                            />

                            {/* Glow Effect */}
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6 }}
                                style={{
                                    filter: "drop-shadow(0px 0px 8px rgba(99,102,241,0.6))"
                                }}
                            />

                            {/* Area Fill */}
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="none"
                                fill="url(#colorGradient)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Intents Section */}
            <div className="intents-section">
                <div className="section-header">
                    <h2>Top Intents</h2>
                    <span className="badge badge-success">Popular</span>
                </div>

                <div className="intents-list">
                    {stats.topIntents.map((item, index) => (
                        <div key={index} className="intent-item">
                            <div className="intent-rank">#{index + 1}</div>
                            <div className="intent-info">
                                <p className="intent-name">{item.intent}</p>
                                <div className="intent-bar">
                                    <div
                                        className="intent-bar-fill"
                                        style={{
                                            width: `${(item.count / stats.topIntents[0].count) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <p className="intent-count">{item.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}