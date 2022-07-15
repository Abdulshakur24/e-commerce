import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

function ProtectedRoutes() {
  const navigator = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return navigator("/register", { replace: true });
  }, [navigator, user]);

  return <Outlet />;
}

export default ProtectedRoutes;
