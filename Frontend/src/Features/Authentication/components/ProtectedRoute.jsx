import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../Hook/useAuth.js'

export default function ProtectedRoute() {
    const location = useLocation()
    const { getMe } = useAuth()
    const [checking, setChecking] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        let mounted = true
        getMe()
            .then(() => mounted && setAuthenticated(true))
            .catch(() => mounted && setAuthenticated(false))
            .finally(() => mounted && setChecking(false))
        return () => { mounted = false }
    }, [getMe])

    if (checking) return <div className="flex min-h-screen items-center justify-center bg-navy text-sm text-muted">Checking your workspace...</div>
    if (!authenticated) return <Navigate to="/login" replace state={{ from: location }} />
    return <Outlet />
}
