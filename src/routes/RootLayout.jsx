import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import NextGenNavbar from "../components/Shared/NextGenNavbar";
import { Footer } from "../components/Shared/Footer";
import { LoadingSpinner } from "../components/Shared/LoadingSpinner";

export const RootLayout = () => {
  return (
    <>
      <NextGenNavbar />

      <main className="min-h-screen ">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
