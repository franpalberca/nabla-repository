import {createContext, useState, ReactNode, Dispatch, SetStateAction} from 'react';

interface UserI {
	id: string;
	userEmail: string;
	userName?: string | null;
	userPassword?: string | null;
	userCreatedAt: string;
	userUpdatedAt: string;
}

interface AuthContextTypeI {
	user: UserI | null;
	setUser: Dispatch<SetStateAction<UserI | null>>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextTypeI>({
	user: null,
	setUser: () => {},
	logout: () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
	const [user, setUser] = useState<UserI | null>(null);
	const logout = () => {
		setUser(null);
	};

	return <AuthContext.Provider value={{user, setUser, logout}}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider};
