import React, { ReactNode, useEffect } from "react";
import useAuthFirebase from "../../hooks/useAuthFirebase";
import LoadingOverlaySystem from "../atom-ui/LoadingOverlaySystem";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const FirebaseProvider = ({ children }: Props) => {
  const authFirebase = useAuthFirebase();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authFirebase.loading && !authFirebase.user) {
      navigate("auth/login");
    }
  }, [authFirebase.loading, authFirebase.user]);

  return (
    <React.Fragment>
      {authFirebase.loading ? (
        <LoadingOverlaySystem />
      ) : (
        <React.Fragment>{authFirebase.user && <>{children}</>}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FirebaseProvider;
