import React from "react";
import useAuth from "./hooks/useAuth";
import async from "./components/Async";
import { useRoutes } from "react-router-dom";

// All pages that rely on 3rd party components (other than MUI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import PresentationLayout from "./layouts/Presentation";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// App

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Landing
import Landing from "./pages/presentation/Landing";
const Questions = async(() => import("./pages/dashboards/Questions"));
const Administrators = async(() => import("./pages/dashboards/Administrators"));
const Subjects = async(() => import("./pages/dashboards/Subjects"));

const SaaS = async(() => import("./pages/dashboards/SaaS"));
const App = async(() => import("./pages/App"));
const Tests = async(() => import("./pages/App/Tests"));
const Results = async(() => import("./pages/App/Results"));
// Form components
const Pickers = async(() => import("./pages/forms/Pickers"));
const Editors = async(() => import("./pages/forms/Editors"));
const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
const Profile = async(() => import("./pages/dashboards/Users/Profile"));

//Users
const Users = async(() => import("./pages/dashboards/Users"));
export default function Router() {
  const { user } = useAuth();
  return useRoutes([
    {
      path: "/",
      element: <PresentationLayout />,
      children: [
        {
          path: "",
          element: <Landing />,
        },
      ],
    },
    {
      path: "app",
      element: (
        <AuthGuard>
          <PresentationLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "",
          element: <App />,
        },
        {
          path: "test",
          element: <Tests />,
        },
        {
          path: "results",
          element: <Results />,
        },
      ],
    },
    {
      path: "dashboard",
      element:
        user?.type_id === 1 ? (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ) : (
          <Page404 />
        ),
      children: [
        {
          path: "",
          element: <Administrators />,
        },
        {
          path: "questions",
          element: <Questions />,
        },
        {
          path: "subjects",
          element: <Subjects />,
        },
        {
          path: "users",
          element: <Users />,
        },
      ],
    },
    {
      path: "pages",
      element: user?.type_id === 1 ? <DashboardLayout /> : <Page404 />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "404",
          element: <Page404 />,
        },
        {
          path: "500",
          element: <Page500 />,
        },
      ],
    },
    {
      path: "*",
      element: <AuthLayout />,
      children: [
        {
          path: "*",
          element: <Page404 />,
        },
      ],
    },
  ]);
}
