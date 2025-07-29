// Пример компонента ProtectedRoute
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthService } from "@api/auth.service";

export const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await AuthService.getMe();
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
