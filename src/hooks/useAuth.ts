import { useState } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            // Placeholder for actual authentication logic
            const response = await fakeAuthService.login(email, password);
            setUser(response.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            // Placeholder for actual registration logic
            const response = await fakeAuthService.signup(email, password);
            setUser(response.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return { user, loading, error, login, signup, logout };
};

export default useAuth;