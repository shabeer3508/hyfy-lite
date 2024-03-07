import { lazy } from "react";


/* Signup flow */
const CreateAccountPage = lazy(() => import("@/pages/auth/signup/pages/1_CreateAccount"));
const VerifyEmailPage = lazy(() => import("@/pages/auth/signup/pages/2_VerifyEmail"));
const OrganizationSetupPage = lazy(() => import("@/pages/auth/signup/pages/3_OrganizationSetup"));
const BillingPage = lazy(() => import("@/pages/auth/signup/pages/4_PaymentSetup"));
const AddMembersPage = lazy(() => import("@/pages/auth/signup/pages/5_AddMembers"));
const AcceptInvitesPage = lazy(() => import("@/pages/auth/signup/pages/6_AcceptInvites"));



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
        path: "/setup_organization",
        component: <OrganizationSetupPage />,
    },
    {
        path: "/billing",
        component: <BillingPage />,
    },
    {
        path: "/invite-members",
        component: <AddMembersPage />,
    },
    {
        path: "/accept-invites",
        component: <AcceptInvitesPage />,
    }
]



