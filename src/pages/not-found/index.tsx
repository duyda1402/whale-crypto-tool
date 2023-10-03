import React from "react";
import ErrorLayout from "../../components/layout/ErrorLayout";
import TitleRoot from "../../components/common-ui/TitleRoot";

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <TitleRoot title="Not Found" />
      <ErrorLayout height="100vh" />
    </React.Fragment>
  );
};

export default NotFoundPage;
