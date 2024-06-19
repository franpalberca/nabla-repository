import { NavbarComponent } from "../components/navbar/Navbar"
import { useContext, useEffect, useState } from "react";
import { getUserById } from "../api/user.fetch";
import { AuthContext } from "../config/context/AuthContext";

export const UserPage = () => {
    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user?.userId) {
                    const fetchedUserData = await getUserById(user.userId);
                    setUserData(fetchedUserData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [user]);
    console.log(user)

  return (
    <>
    <NavbarComponent />
    <div>
                <h1>User Page</h1>
                {user && (
                    <div>
                        <p>User ID: {user.userId}</p>
                        <p>Email: {user.userEmail}</p>
                        <p>Name: {user.userName}</p>
                        
                    </div>
                )}
            </div>
    </>
  )
}