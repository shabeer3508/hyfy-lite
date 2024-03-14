import { lazy } from "react";


/* Settings Routes */

const SettingsHome = lazy(() => import("@/pages/settings/home"));
const OrganizationSettings = lazy(() => import("@/pages/settings/home"));
const BillingSettings = lazy(() => import("@/pages/settings/home"));
const NotificationSettings = lazy(() => import("@/pages/settings/home"));
const UserRolesSettings = lazy(() => import("@/pages/settings/home"));

export const settingsRoutes = [
    {
        path: "/",
        component: <SettingsHome />,
    },
    {
        path: "/organization",
        component: <OrganizationSettings />,
    },
    {
        path: "/billing",
        component: <BillingSettings />,
    },
    {
        path: "/notification",
        component: <NotificationSettings />,
    },
    {
        path: "/roles",
        component: <UserRolesSettings />,
    },
]
