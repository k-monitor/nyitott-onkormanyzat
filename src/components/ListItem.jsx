import Icon from "./ui/Icon";
import horseIcon from "../../assets/horse-icon.svg";
import pinIcon from "../../assets/pin-icon.svg";
import styles from "../css/list-item.module.css";
import { config } from "src/config";

const ListItem = ({ item, onClick, ...props }) => {
    // const oligarchs = item.properties.mainOligarch.length > 0 ? item.properties.mainOligarch : item.properties.oligarchs;

    return (
        <a
            href={config.prefix+"/candidates/"+item.id+""}
            className={styles.listItem}
            {...props}
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onClick();
                }
            }}
        >
            <h1>{item.name}</h1>
        </a>
    );
};

export default ListItem;
