import { useContext, useCallback } from "react";

import Search from "./Search";
import styles from "./Header.module.css";
import Icon from "../components/ui/Icon";
import ListIcon from "../../assets/menu-icon.svg";

import Logo from "../../assets/logo-szoveg.svg";
import logoEn from "../../assets/nh-logo-en.svg";
import { MapContext } from "../context";

import { config } from "../config";


// import { SmartLink } from "../SmartLink";

const Header = (props) => {
    const { dispatch } = useContext(MapContext);
    //const { i18n } = useTranslation();
    //const { resolvedLanguage } = i18n;
    //const location = useLocation();

    const languageChangeHandler = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem(config.locales.paramName, lang);
        // props.history.push({
        //     pathname: location.pathname,
        //     search: `?${config.locales.paramName}=${lang}`,
        // });
    };

    const onMenuCallback = useCallback(() => {
        dispatch({ type: "ToggleMenu", showMenu: true });
    }, [dispatch]);

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <a
                    href={'/'}
                    onClick={() => {
                        dispatch({ type: "TogglePopup", showPopup: false });
                    }}
                    className={styles.logo}
                >
                    <Logo style={{scale:"0.9"}} />
                </a>
            </div>
            <div className={styles.searchContainer}>
                <Search />
            </div>
            <div className={styles.langSwitchContainer}>
            </div>
            <div className={styles.menuContainer}>
                <button onClick={onMenuCallback} type="button" className="resetButton">
                    <ListIcon />
                </button>
            </div>
        </header>
    );
};

export default Header;
