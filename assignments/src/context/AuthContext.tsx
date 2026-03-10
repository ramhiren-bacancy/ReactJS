import { createContext, useContext, useState, type ReactNode } from "react";

type Role = "admin" | "user";
type UserType = {
    name: string;
    role: Role;
    isLoggedIn: boolean;
};

type UserContextType = {
    login: (name: string, role: Role) => void;
    logout: () => void;
} & UserType ;



const AuthContext = createContext<UserContextType | null>(null);

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user,setUser] = useState<UserType>({name:"", role:"user", isLoggedIn:false});

    const login =  (name: string, role: Role) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setUser({ name, role, isLoggedIn: true });
                resolve();
            },1000);
        });
    };

    const logout = () => {
        setUser({name:"", role:"user", isLoggedIn:false});
    };

    

    return (
        <AuthContext.Provider value={{ ...user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}
