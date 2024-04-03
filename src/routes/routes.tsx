import React from 'react'
import { createHashRouter } from 'react-router-dom'
import { HomeLayout } from '../layouts/HomeLayout'
import { Login } from '../pages/authentication/login'
import { ChangePassword } from '../pages/authentication/changePassword'
import { ForgotPassword } from '../pages/authentication/forgotPassword'
import { ChangeNewPassword } from '../pages/authentication/changeNewPassword'
import { PasswordOTP } from '../pages/authentication/passwordOTP'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Wallet } from '../pages/dashboard/wallet/wallet'
import { Settings } from '../pages/dashboard/settings/settings'
import { Profile } from '../pages/dashboard/profile/profile'
import { VerifyLoginOTP } from '../pages/authentication/verifyLoginOTP'
import { Dashboard } from '../pages/dashboard/dashboard'
import { FirstTimeOTP } from '../pages/authentication/firstTimeOTP'
import { GeneralErrorPage } from '../shared/error/404-error-page'

export const router = createHashRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement:<GeneralErrorPage/>,
      children: [
        { path: '/', index: true, element: <Login /> },
        { path: '/login', index: true, element: <Login /> },
        { path: '/change-password', index: true, element: <ChangePassword /> },
        { path: '/forgot-password', index: true, element: <ForgotPassword /> },
        { path: '/password-otp', index: true, element: <PasswordOTP /> },
        { path: '/password-change', index: true, element: <ChangeNewPassword /> },
        { path: '/verify-login', index: true, element: <VerifyLoginOTP /> },
        { path: '/first-timer', index: true, element: <FirstTimeOTP /> },

      ]
    },

    {
      path: '/',
      element: <DashboardLayout />,
      errorElement:<GeneralErrorPage/>,
      children: [
        { path: '/dashboard', index: true, element: <Dashboard /> },
        { path: '/dashboard/wallet', index: true, element: <Wallet /> },
        { path: '/dashboard/profile', index: true, element: <Profile /> },
        { path: '/dashboard/settings', index: true, element: <Settings /> },
      ]
    }
])
