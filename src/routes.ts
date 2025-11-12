export const publicRoutes = [
    "/", "/popular","/anime/:id", "/new-verification","/sitemap.xml","/robots.txt","/opengraph-image.png"
]
export const authRoutes = ["/login", "/register",'/error','/reset','/new-password']
export const protectedRoutes = [
    "/dashboard"
]
export const apiAuthPrefix = "/api/auth"
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"