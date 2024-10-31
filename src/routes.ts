export const publicRoutes=[
    '/',
    '/auth/login', // Allow access to login
  '/auth/register',
  '/auth/new-verification'

]

export const authRoutes=[
    '/auth/login',
    '/auth/register',
    
]
export const apiAuthPrefix='/api/auth'
export const defaultLoggedInRedirect='/settings'