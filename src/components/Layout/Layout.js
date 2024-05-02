import Head from 'next/head';

import Header from '../../header/Header';
import List from "../List";
import Menu from "../../header/Menu";

import styles from './Layout.module.scss';
import { useEffect, useContext } from "react";
import { MapContext } from "../../context";


const Layout = ({ children, className, ...rest }) => {
  const { dispatch, showMenu } = useContext(MapContext);

  useEffect(() => {
      dispatch({ type: "ToggleMenu", showMenu: false });
  }, [dispatch]);


  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {showMenu && <Menu />}
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
