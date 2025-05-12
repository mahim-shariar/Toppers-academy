// src/router.js
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./ErrorPage";
import AllCoureses from "../pages/AllCoureses";
import CourseDetails from "../components/CoursesPage/CourseDetails";
import { DashboardLayout } from "../components/Dashboard/DashboardLayout";
import LoginForm from "../pages/LoginForm";

const Home = lazy(() => import("../pages/Home"));
const DashboardHome = lazy(() => import("../pages/Dashboard/DashboardHome"));
const CoursesManagement = lazy(() =>
  import("../pages/Dashboard/CoursesManagement")
);
const TeachersManagement = lazy(() =>
  import("../pages/Dashboard/TeacherManagement")
);
const StudentsManagement = lazy(() =>
  import("../pages/Dashboard/StudentsManagement")
);
const SuccessStories = lazy(() => import("../pages/Dashboard/SuccessStories"));

const SettingsPage = lazy(() => import("../pages/Dashboard/Settings"));
const ChangePassword = lazy(() => import("../pages/Dashboard/ChangePassword"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allCourses",
        element: <AllCoureses />,
      },
      {
        path: "/coursesDetails",
        element: <CourseDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "courses",
        element: <CoursesManagement />,
      },
      {
        path: "teachers",
        element: <TeachersManagement />,
      },
      {
        path: "students",
        element: <StudentsManagement />,
      },
      {
        path: "success-stories",
        element: <SuccessStories />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginForm />,
  },
]);
