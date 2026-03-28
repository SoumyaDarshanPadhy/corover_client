import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/dashboard.api";
import { setToken } from "../utils/auth";
import "./Login.css";

export default function Login() {
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setError("");
            setLoading(true);

            const res = await login(apiKey);

            const token = res.data.token;

            setToken(token);

            navigate("/dashboard");
        } catch (error) {
            setError(error?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && apiKey && !loading) {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="login-background"></div>

            <div className="login-card">
                <div className="login-header">
                    <h1>COROVER.AI</h1>
                </div>

                <div className="login-form">
                    <div className="form-group">
                        <input
                            id="apiKey"
                            type="password"
                            placeholder="Enter your API key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                            className="form-input"
                        />
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <button
                        onClick={handleLogin}
                        disabled={loading || !apiKey}
                        className="btn btn-primary btn-login"
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}