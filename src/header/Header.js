import { useContext, useCallback } from "react";

import Search from "./Search";
import styles from "./Header.module.css";
import Icon from "../components/ui/Icon";
import ListIcon from "../../assets/menu-icon.svg";

import Logo from "../../assets/nyitott-onkormanyzat-logo-szoveg.svg";
import logoEn from "../../assets/nh-logo-en.svg";
import { MapContext } from "../context";

import { config } from "../config";


// import { SmartLink } from "../SmartLink";

const Header = (props) => {
    const { dispatch } = useContext(MapContext);

    const onMenuCallback = useCallback(() => {
        dispatch({ type: "ToggleMenu", showMenu: true });
    }, [dispatch]);

    return (
        <div >
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <a
                    href={'/'}
                    onClick={() => {
                        dispatch({ type: "TogglePopup", showPopup: false });
                    }}
                    className={styles.logo}
                >
                    <Logo style={{scale:"0.9", fill: "#fff", width: "150px"}} />
                </a>
            </div>
            <div className={styles.searchContainer}>
                <Search />
            </div>
            <div className={styles.langSwitchContainer}>
            </div>
            <div className={styles.menuContainer}>
                <button onClick={onMenuCallback} type="button" className="resetButton">
                    <ListIcon style={{fill: '#fff'}} />
                </button>
            </div>
        </header>
        </div>
    );
};

export default Header;
