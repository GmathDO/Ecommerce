import { useAuth } from "./context/auth"
import { Navigate } from "react-router"

export function ProtectedRoute({ children }){
    const { token } = useAuth()

    return token ? children : <Navigate to='/' />
}