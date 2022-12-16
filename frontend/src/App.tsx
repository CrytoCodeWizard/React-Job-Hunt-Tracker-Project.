import { Route, Routes, useNavigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import useAppStore from "./store/store";
import React, { Suspense, useEffect } from "react";
import { localStorageKeys } from "./api/config";
import Home from "./pages/Home";
import FullScreenSpinner from "./components/FullScreenSpinner";
import { verifyUser } from "./utilities/auth";

const App = () => {
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));

  const appStore = useAppStore((state) => state);

  const navigate = useNavigate();

  const userState = useAppStore((state) => state.user);

  useEffect(() => {
    if (userState.isVerified) {
      return navigate("/");
    }
  }, [userState.isVerified]);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem(localStorageKeys.jwtToken);

      if (token) {
        if (await verifyUser(token)) {
          appStore.setIsVerified(true);
          appStore.setToken(token);
        } else {
          appStore.setIsVerified(false);
        }
      }
    };

    verify();
  }, [appStore.user]);

  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            appStore.user.isVerified ? (
              <Home />
            ) : (
              <>
                {
                  <Suspense fallback={<FullScreenSpinner />}>
                    <Login />
                  </Suspense>
                }
              </>
            )
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<FullScreenSpinner />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<FullScreenSpinner />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<FullScreenSpinner />}>
              <Register />
            </Suspense>
          }
        />
      </Routes>
    </AppLayout>
  );
};

export default App;
