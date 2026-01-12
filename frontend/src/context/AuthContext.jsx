import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await axios.get('/auth/me');
                setUser(data);
            } catch (error) {
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const { data } = await axios.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post('/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const googleLogin = async (userInfo) => {
        const { data } = await axios.post('/auth/google', userInfo);
        localStorage.setItem('token', data.token);
        setUser(data);
    };

    const forgotPassword = async (email) => {
        await axios.post('/auth/forgot-password', { email });
    };

    const resetPassword = async (email, otp, newPassword) => {
        await axios.post('/auth/reset-password', { email, otp, newPassword });
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, googleLogin, forgotPassword, resetPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
