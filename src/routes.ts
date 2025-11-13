export const publicRoutes = [
    "/"
]
export const authRoutes = ["/login", "/register",'/error','/reset','/new-password']
export const protectedRoutes = [
    "/dashboard","/admin","/apply/:id"
]
export const DEFAULT_LOGIN_REDIRECT = "/"