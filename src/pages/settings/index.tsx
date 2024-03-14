import { Suspense } from "react";
import { settingsRoutes } from "./routes";
import { loading } from "@/layout/TheContent";
import { Route, Routes, } from "react-router-dom";
import NotFound from "@/pages/empty-screens/NotFound";

const Settings = () => {
  return (
    <div className="h-screen">
      <Suspense fallback={loading}>
        <Routes>
          {settingsRoutes.map((route, idx) => {
            if (route.path) {
              return <Route key={idx} path={route.path} element={route.component} />;
            }
          })}

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>

    </div>
  );
};

export default Settings;
