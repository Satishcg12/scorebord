import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import useVerifyStore from "../store/VerifyStore";
import { API } from "../utils/config";

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
  const { isTrial,trialStartDate,isVerified,trialOver } = useVerifyStore();
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
    const {
      trialStartDate,
      overTrial,
      username,
      productKey,
      unVerify,
      lastVerified,
    } = useVerifyStore();

    const trialDate = new Date(trialStartDate).getTime();
    let now = new Date().getTime();
    let diff = now - trialDate;
    let days = diff / (1000 * 60 * 60 * 24);
    if (days > 14) {
      overTrial();
      useVerifyStore.setState({ trialOver: true });
      return <Navigate to="/trial" replace />;
    }

    //revalidate if last verified is more than 30 days
    const lastVerifiedDate = new Date(lastVerified).getTime();
    now = new Date().getTime();
    diff = now - lastVerifiedDate;
    days = diff / (1000 * 60 * 60 * 24);
    if (days > 30) {
      fetch(API + "?product_key=" + productKey + "&username=" + username)
        .then((response) => response.json())
        .then((res) => {
          if (res.error === false) {
            if (res.data[0].active) {
              useVerifyStore.setState({
                isVerified: true,
                lastVerified: new Date().toDateString(),
              });
            } else {
              unVerify();
            }
          }
        });
    }
  }

  if (!isAuth) {
    return <Navigate to="/verify" replace />;
  }

  return <>
    {!isVerified && isTrial && !trialOver &&
      <div className="z-50 absolute bottom-2 left-2 px-2 rounded bg-[#fff3] backdrop-blur-sm text-white text-center ">
        <p>Trial Remaining: {remainingDays} days</p>
      </div>
    }
  {children ? children : <Outlet />}
  
  </>
};

export default ProtectedRoute;
