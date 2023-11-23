import React from "react";

import { Helmet } from "react-helmet";
type Props = {
  title: string;
};

const NAME_APP = import.meta.env.VITE_APP_TITLE;

const TitleRoot = ({ title = "" }: Props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>
          {NAME_APP} - {title}
        </title>
      </Helmet>
    </React.Fragment>
  );
};

export default TitleRoot;
