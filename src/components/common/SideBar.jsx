import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, MessagesSquare, SlidersHorizontal, LogOut } from "lucide-react";
import { logout } from "../../utils/auth";
import "./Sidebar.css";

const NAV = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/sessions", label: "Sessions", icon: MessagesSquare },
    { path: "/queries", label: "Raw Queries", icon: SlidersHorizontal },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <aside className="sidebar-root">

            {/* header */}
            <div className="sidebar-header">
                <div className="logo-row">
                    <span className="logo-wordmark">COROVER</span>
                </div>
            </div>

            {/* nav */}
            <nav className="sidebar-nav">
                {NAV.map(({ path, label, icon: Icon }) => {
                    const isActive = location.pathname === path;

                    return (
                        <div
                            key={path}
                            className={`nav-link ${isActive ? "active" : ""}`}
                            onClick={() => navigate(path)}
                        >
                            <Icon size={15} className="nav-icon" />
                            {label}
                            {isActive && <span className="nav-dot" />}
                        </div>
                    );
                })}
            </nav>

            {/* footer */}
            <div className="sidebar-footer">
                <button
                    className="logout-btn"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    <LogOut size={15} className="nav-icon" />
                    Logout
                </button>
            </div>
        </aside>
    );
}