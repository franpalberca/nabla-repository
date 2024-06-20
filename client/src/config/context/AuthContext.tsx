import {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';
import { getToken, removeToken, setToken } from '../../utils/auth';


interface UserI {
	userId: string;
	userEmail: string;
	userName?: string | null;
	userPassword?: string | null;
    userImage?: string | null;
	userCreatedAt: string;
	userUpdatedAt: string;
    isAdmin: boolean;
}

interface AuthContextTypeI {
	user: UserI | null;
	setUser: Dispatch<SetStateAction<UserI | null>>;
    tokenState: string | null;
	login: (user: UserI, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextTypeI>({
	user: null,
	setUser: () => {},
    tokenState: null,
	login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<UserI | null>(null);
    const [tokenState, setTokenState] = useState<string | null>(getToken())

    const login = (user: UserI, token: string) => {
        setUser(user);
        setToken(token);
        setTokenState(token)
    };

    const logout = () => {
        setUser(null);
        removeToken();
        setTokenState(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, tokenState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };