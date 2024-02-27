import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import useVerifyStore from "../store/VerifyStore";
import { supabase } from "../utils/supabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

const isAuthenticated = () => {
  const { isVerified, isTrial, trialOver } = useVerifyStore();
  //check if user is verified or on trial
  return isVerified || (isTrial && !trialOver);
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = isAuthenticated();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const {
    isTrial,
    trialStartDate,
    isVerified,
    trialOver,
    unVerify,
    setLastVerified,
    overTrial,
    username,
    lastVerified,
  } = useVerifyStore();
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    // calculate remaining days
    const trialDate = new Date(trialStartDate).getTime();
    const endDate = trialDate + 14 * 24 * 60 * 60 * 1000;
    let now = new Date().getTime();
    let diff = endDate - now;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setRemainingDays(days);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    //cleck if trial is over

    const trialDate = new Date(trialStartDate).getTime();
    let now = new Date().getTime();
    let diff = now - trialDate;
    let days = diff / (1000 * 60 * 60 * 24);
    if (days > 14) {
      overTrial();
      useVerifyStore.setState({ trialOver: true });
      return <Navigate to="/trial" replace />;
    }
  }
  useEffect(() => {
    if (isOnline) {
      const getData = async () => {
        const { data: license, error } = await supabase
          .from("license")
          .select("*")
          .eq("username", username);
        if (error !== null && error.code) {
          unVerify();
          return <Navigate to="/verify" replace />;
        }
        if (license != null) {
          
          if (license.length === 0) {
            unVerify();
            return <Navigate to="/verify" replace />;
          }
          if (!license[0].active) {
            unVerify();
            return <Navigate to="/verify" replace />;
          }
          
        }
      }

      const lastVerifiedDate = new Date(lastVerified).getTime();
      const now = new Date().getTime();
      const diff = now - lastVerifiedDate;
      const days = diff / (1000 * 60 * 60 * 24);
      if (days > 7 ) {
        getData();
        setLastVerified(new Date().toDateString());
      }
    }
  }, [isOnline]);

  if (!isAuth) {
    return <Navigate to="/verify" replace />;
  }

  return (
    <>
      {!isVerified && isTrial && !trialOver && (
        <div className="z-50 absolute bottom-2 left-2 px-2 rounded bg-[#fff3] backdrop-blur-sm text-white text-center ">
          <p>Trial Remaining: {remainingDays} days</p>
        </div>
      )}
      {children ? children : <Outlet />}
    </>
  );
};

export default ProtectedRoute;
