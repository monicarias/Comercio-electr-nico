import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import UserContext from "../context/User/UserContext";

export default function PrivateRoute({ component: Component }) {
  const userCtx = useContext(UserContext);

  const { authStatus, verifyingToken } = userCtx;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      return await verifyingToken();
    };

    verifyToken();
    setLoading(false);
  }, [authStatus]);

  if (loading) return null;

  return (
    <>
      {authStatus ? <Component /> : <Navigate replace to="/iniciar-sesion" />}
    </>
  );
}
