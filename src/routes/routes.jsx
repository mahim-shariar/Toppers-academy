import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { ErrorPage } from "./ErrorPage";
import AllCoureses from "../pages/AllCoureses";
import CourseDetails from "../components/CoursesPage/CourseDetails";

const Home = lazy(() => import("../pages/Home"));

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
  // {
  //   path: "dashboard",
  //   element: <Dashboard />,
  //   // children: [],
  // },
]);
