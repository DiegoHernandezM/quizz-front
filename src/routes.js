import React from "react";
import useAuth from './hooks/useAuth';
import async from "./components/Async";
import { useRoutes } from "react-router-dom";

// All pages that rely on 3rd party components (other than MUI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
import PresentationLayout from "./layouts/Presentation";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Components
import Accordion from "./pages/components/Accordion";
import Alerts from "./pages/components/Alerts";
import Avatars from "./pages/components/Avatars";
import Badges from "./pages/components/Badges";
import Buttons from "./pages/components/Buttons";
import Cards from "./pages/components/Cards";
import Chips from "./pages/components/Chips";
import Dialogs from "./pages/components/Dialogs";
import Lists from "./pages/components/Lists";
import Menus from "./pages/components/Menus";
import Pagination from "./pages/components/Pagination";
import Progress from "./pages/components/Progress";
import Snackbars from "./pages/components/Snackbars";
import Tooltips from "./pages/components/Tooltips";

// Form components
import SelectionCtrls from "./pages/forms/SelectionControls";
import Selects from "./pages/forms/Selects";
import TextFields from "./pages/forms/TextFields";

// Icon components
import MaterialIcons from "./pages/icons/MaterialIcons";

// Page components
import Blank from "./pages/pages/Blank";
import InvoiceDetails from "./pages/pages/InvoiceDetails";
import InvoiceList from "./pages/pages/InvoiceList";
import Orders from "./pages/pages/Orders";
import Pricing from "./pages/pages/Pricing";
import Settings from "./pages/pages/Settings";
import Projects from "./pages/pages/Projects";
import Chat from "./pages/pages/Chat";

// Table components
import SimpleTable from "./pages/tables/SimpleTable";
import AdvancedTable from "./pages/tables/AdvancedTable";

// Documentation
import Welcome from "./pages/docs/Welcome";
import GettingStarted from "./pages/docs/GettingStarted";
import Routing from "./pages/docs/Routing";
import Auth0 from "./pages/docs/auth/Auth0";
import Cognito from "./pages/docs/auth/Cognito";
import Firebase from "./pages/docs/auth/Firebase";
import JWT from "./pages/docs/auth/JWT";
import Guards from "./pages/docs/Guards";
import EnvironmentVariables from "./pages/docs/EnvironmentVariables";
import Deployment from "./pages/docs/Deployment";
import Theming from "./pages/docs/Theming";
import APICalls from "./pages/docs/APICalls";
import Redux from "./pages/docs/Redux";
import Internationalization from "./pages/docs/Internationalization";
import ESLintAndPrettier from "./pages/docs/ESLintAndPrettier";
import Support from "./pages/docs/Support";
import Changelog from "./pages/docs/Changelog";

// Landing
import Landing from "./pages/presentation/Landing";

// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";

// Dashboard components
const Default = async(() => import("./pages/dashboards/Default"));
const Analytics = async(() => import("./pages/dashboards/Analytics"));
const Questions = async(() => import("./pages/dashboards/Questions"));
const Administrators = async(() => import("./pages/dashboards/Administrators"));
const Subjects = async(() => import("./pages/dashboards/Subjects"));
const SaaS = async(() => import("./pages/dashboards/SaaS"));

// Form components
const Pickers = async(() => import("./pages/forms/Pickers"));
const Editors = async(() => import("./pages/forms/Editors"));
const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
const FeatherIcons = async(() => import("./pages/icons/FeatherIcons"));
const Profile = async(() => import("./pages/pages/Profile"));
const Tasks = async(() => import("./pages/pages/Tasks"));
const Calendar = async(() => import("./pages/pages/Calendar"));

// Table components
const DataGrid = async(() => import("./pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("./pages/charts/Chartjs"));
const ApexCharts = async(() => import("./pages/charts/ApexCharts"));

// Maps components
const GoogleMaps = async(() => import("./pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("./pages/maps/VectorMaps"));

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
      path: "dashboard",
      element: user?.type_id === 1 ? (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ) : <Page404 />,
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
      element: <DashboardLayout />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "settings",
          element: <Settings />,
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
