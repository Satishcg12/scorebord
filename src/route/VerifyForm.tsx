import { FormEvent, useEffect, useState } from "react";
import useVerifyStore from "../store/VerifyStore";
import { Navigate, useNavigate } from "react-router-dom";
import { API } from "../utils/config";
import logo from "../assets/images/logo.jpg";

export default function VerifyForm() {
  const [username, setUsername] = useState("");
  const [productkey, setProductKey] = useState("");
  const [isVerifiying, setIsVerifying] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isVerified, verify, trialOver,isTrial} = useVerifyStore();
  const navigate = useNavigate();

  
  const verifyKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isVerifiying) return;
    setIsVerifying(true);
    const response = await fetch(
      API + "?product_key=" + productkey + "&username=" + username
    );
    const res = await response.json();
    setIsVerifying(false);
    if (res.error === false) {
      if (res.data[0].active) {
        verify();
        useVerifyStore.setState({
          isVerified: true,
          username: username,
          productKey: productkey,
          lastVerified: new Date().toDateString(),
        })
      }

    } else {
      alert("Product key not verified");
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    //if verfied
    if (isVerified) {
      navigate("/");
    }
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

    };
  }, []);

  return isTrial || isVerified ? (
    <Navigate to="/" replace />
  ) : isOnline ? (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Kata kumte logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter your product key here
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={verifyKey}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="productkey"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Key
                </label>
                <div className="text-sm">
                  <a
                    href="mailto:sung20700@gmail.com"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your product key?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="productkey"
                  name="productkey"
                  type="productkey"
                  value={productkey}
                  onChange={(e) => setProductKey(e.target.value)}
                  autoComplete="current-productkey"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                id="verify"
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isVerifiying ? "Verifying..." : "Verify"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/trial"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {trialOver ? "Trial over" : "try for free for 14 days"}
            </a>
          </p>
        </div>
      </div>
    </>
  ) : (
    <div className="bg-gray-100 px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <img
          src="/assets/images/logo.jpg"
          alt="Kata kumte logo"
          className="w-32 h-32"
        />
        <h1 className="text-8xl font-extrabold text-purple-500">OFFLINE</h1>
        <p className="text-4xl font-medium text-gray-800">
          You are not connected to the internet
        </p>
        <p className="text-xl text-gray-800 mt-4">
          You can't verify your product key while offline
        </p>
      </div>
    </div>
  );
}
