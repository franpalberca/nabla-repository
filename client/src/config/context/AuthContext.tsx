import {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';

interface UserI {
	userId: string;
	userEmail: string;
	userName?: string | null;
	userPassword?: string | null;
    userImage?: string | null;
	userCreatedAt: string;
	userUpdatedAt: string;
}

interface AuthContextTypeI {
	user: UserI | null;
	setUser: Dispatch<SetStateAction<UserI | null>>;
	login: (user: UserI, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextTypeI>({
	user: null,
	setUser: () => {},
	login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<UserI | null>(null);

    const login = (user: UserI, token: string) => {
        setUser(user);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };