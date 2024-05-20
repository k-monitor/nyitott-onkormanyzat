'use client'

import { useCallback, useRef } from "react";
// import { SmartLink } from "../SmartLink";
import CloseIcon from "../../assets/close-icon.svg";
import styles from "./Menu.module.css";
import Icon from "../components/ui/Icon";
import Image from "../../assets/nh-main.svg";
import Logo from "../../assets/nyitott-onkormanyzat-logo-szoveg.svg";
import logoEn from "../../assets/nh-logo-en.svg";
import { CSSTransition } from "react-transition-group";
import { useEffect, useContext } from "react";
import { MapContext } from "../context";
import { config } from "src/config";
import { Source_Code_Pro, Montserrat } from 'next/font/google'
const scp = Source_Code_Pro({ subsets: ['latin'] })

const Menu = () => {
    const menuRef = useRef(null);
    const backdropRef = useRef(null);

    const { dispatch, showMenu } = useContext(MapContext);

    const closeMenu = useCallback(() => {
        dispatch({ type: "ToggleMenu", showMenu: false });
    }, [dispatch]);


    return (
        <div className={scp.className}>
            <CSSTransition in={showMenu} nodeRef={menuRef} classNames="Menu" unmountOnExit timeout={200}>
                <nav className={styles.menu} ref={menuRef}>
                    <div className={styles.content}>
                        <div className={styles.close}>
                            <button onClick={closeMenu} type="button" className="resetButton">
                                <CloseIcon />
                            </button>
                        </div>

                        <Logo style={{scale:"2", margin: "0px", marginBottom: "50px", marginLeft: "70px", fill: "var(--dark-blue)"}} />

                        <ul className={styles.menulist}>
                            <li><a href={config.prefix+'/list/'} onClick={closeMenu}>Jelöltek vállalásai</a></li>
                            <li><a href={config.prefix+'/map/'} onClick={closeMenu}>Térkép</a></li>
                            <li><a href={config.prefix+'/'+"about"} onClick={closeMenu}>Mi ez?</a></li>
                            <li><a href={config.prefix+'/'+"paper"} onClick={closeMenu}>Tanulmány</a></li>
                            <li><a href={'https://docs.google.com/forms/d/e/1FAIpQLScGZmVAP0Ka_oGt7bhPkUmT7weW139NfeOHW-3ZYNTJT6SaPw/viewform'} onClick={closeMenu}>Vállalást teszek!</a></li>
                            <li><a href="https://tamogatas.k-monitor.hu/" onClick={closeMenu}>Tetszik? Támogasd!</a></li>
                        </ul>

                        <address className={styles.footer}>
                            <p>
                                <strong>
                                K-Monitor<br/>
                                Közhasznú Egyesület<br/>
                                </strong>
                                                                
                                Levelezési cím:<br/>
                                1062 Budapest, Bajza u. 23 I/1

                            </p>
                            <a href="mailto:info@k-monitor.hu">info@k-monitor.hu</a>
                        </address>
                    </div>
                </nav>
            </CSSTransition>
            <CSSTransition in={showMenu} nodeRef={backdropRef} classNames="MenuBackdrop" unmountOnExit timeout={200}>
                <div className={styles.backdrop} ref={backdropRef} onClick={closeMenu} />
            </CSSTransition>
        </div>
    );
};

export default Menu;
