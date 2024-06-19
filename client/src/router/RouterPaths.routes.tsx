import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

export const Router = () => {
    const { user } = useAuth0();
    return (
        <BrowserRouter>
        <Routes>
            <Route path={LANDING} element={<PublicRoute />}>
            <Route index element={<LandingPage />} />
            </Route>
            <Route path={USER} element={<PrivateRoute />}></Route>
        </Routes>
        </BrowserRouter>
    )
}