import { lazy } from "react";


/* Signup flow */
const CreateAccountPage = lazy(() => import("@/pages/auth/signup/pages/1_CreateAccount"));
const VerifyEmailPage = lazy(() => import("@/pages/auth/signup/pages/2_VerifyEmail"));
const AccountSetupPage = lazy(() => import("@/pages/auth/signup/pages/3_AccountSetup"));
const CreateProjectPage = lazy(() => import("@/pages/auth/signup/pages/4_CreateProject"));
const AddMembersPage = lazy(() => import("@/pages/auth/signup/pages/5_AddMembers"));



export const signupRoutes = [
    {
        path: "/",
        component: <CreateAccountPage />,
    },
    {
        path: "/verify_email",
        component: <VerifyEmailPage />,
    },
    {
        path: "/setup_account",
        component: <AccountSetupPage />,
    },
    {
        path: "/create_project",
        component: <CreateProjectPage />,
    },
    {
        path: "/add_members",
        component: <AddMembersPage />,
    }
]



