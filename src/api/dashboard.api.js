import api from "./axios";

// 🔐 Login
export const login = async (apiKey) => {
    const res = await api.post("/dashboard/login", { apiKey });
    return res.data; // return only useful data
};

// 📊 Stats
export const getStats = async () => {
    const res = await api.get("/dashboard/stats");
    return res.data;
};

// 📋 Sessions
export const getSessions = async (page = 1, limit = 20) => {
    const res = await api.get(`/dashboard/sessions?page=${page}&limit=${limit}`);
    return res.data;
};

// � Search Sessions
export const searchSessions = async (searchTerm, page = 1, limit = 20) => {
    const res = await api.get(`/dashboard/sessions/search?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`);
    return res.data;
};

// �📄 Raw Queries
export const getRawQueries = async (page = 1, limit = 20, sessionId) => {
    let url = `/dashboard/raw-queries?page=${page}&limit=${limit}`;

    if (sessionId) {
        url += `&sessionId=${sessionId}`;
    }

    const res = await api.get(url);
    return res.data;
};