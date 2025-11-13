import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { getStoredUser, isAuthenticated, clearAuthData } from '@/lib/api';
import type { User, LoginRequest, AuthResponse } from '@/types/user';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(getStoredUser());
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(isAuthenticated());
    const queryClient = useQueryClient();

    // Check auth status on mount and token changes
    useEffect(() => {
        const checkAuth = () => {
            const currentUser = getStoredUser();
            const authStatus = isAuthenticated();
            setUser(currentUser);
            setIsAuthenticatedState(authStatus);
        };

        checkAuth();
        
        // Listen for storage changes (logout in another tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'auth_token' || e.key === 'user_data') {
                checkAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onSuccess: (data: AuthResponse) => {
            setUser(data.user);
            setIsAuthenticatedState(true);
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error('Login failed:', error);
            setUser(null);
            setIsAuthenticatedState(false);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            setUser(null);
            setIsAuthenticatedState(false);
            queryClient.clear();
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            // Clear local state even if API call fails
            clearAuthData();
            setUser(null);
            setIsAuthenticatedState(false);
            queryClient.clear();
        }
    });

    const login = async (credentials: LoginRequest): Promise<void> => {
        await loginMutation.mutateAsync(credentials);
    };

    const logout = async (): Promise<void> => {
        await logoutMutation.mutateAsync();
    };

    const value: AuthContextType = {
        user,
        isLoading: loginMutation.isPending || logoutMutation.isPending,
        isAuthenticated: isAuthenticatedState,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};