import Head from "next/head";
import React, { Fragment } from "react";
import Notification from "../components/Notification";

interface LayoutProps {
  children?: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <Head>
        <title>Simple NextJs ChatApp</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Notification />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;

// const [open, setOpen] = useState(true);
// const handleDrawerOpen = () => {
//   setOpen(true);
// };
// const handleDrawerClose = () => {
//   setOpen(false);
// };
