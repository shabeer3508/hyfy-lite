import { lazy } from "react";

/* Settings Routes */

const SettingsHome = lazy(() => import("@/pages/settings/home"));
const BillingSettings = lazy(() => import("@/pages/settings/billing-settings"));
const UserRolesSettings = lazy(() => import("@/pages/settings/user-roles-settings"));
const OrganizationSettings = lazy(() => import("@/pages/settings/organization-settings"));
const NotificationSettings = lazy(() => import("@/pages/settings/notification-settings"));

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
