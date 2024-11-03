export const publicRoutes=[
    '/',
    '/auth/login', // Allow access to login
  '/auth/register',
  '/auth/new-verification',
   '/auth/reset-password',
   '/auth/new-password'
]

export const authRoutes=[
    '/auth/login',
    '/auth/register',
    '/auth/new-verification',
    '/auth/reset-password',
     '/auth/new-password'
]
export const apiAuthPrefix='/api/auth'
export const defaultLoggedInRedirect='/settings'