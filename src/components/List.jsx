import { useContext, useCallback } from "react";
import styles from "../css/list.module.css";
import Icon from "./ui/Icon";

import CloseIcon from "../../assets/close-icon.svg";

import { MapContext } from "../context";
import { Source_Code_Pro, Montserrat } from 'next/font/google'
const scp = Source_Code_Pro({ subsets: ['latin'] })
import {catToColor, catToProjColor} from 'src/utils/categoryColor';


function List() {
    const { dispatch, list, map } = useContext(MapContext);

    const closeList = useCallback(() => {
        dispatch({ type: "ToggleList", showList: false });
    }, [dispatch]);

    return (
        <div className={styles.list} aria-modal>
            <style jsx>{`
              .entry:hover {
                -webkit-filter: brightness(90%)
              }
            `}</style>
            <div className={styles.closeButton} onClick={closeList}>
                <CloseIcon size="large" />
            </div>
            <div className={scp.className}>
                {list && list.length > 0 && list.map((record, key) =>
                <div className='entry' style={{backgroundColor: "#eee", borderBottom: "solid var(--cat-blue) 6px", borderColor: catToColor(record.category), borderRight: "solid #777 1px",borderLeft: "solid #777 1px",borderTop: "solid #777 1px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", maxWidth: "700px", marginBottom: "5px", alignSelf: "center", display: "flex"}}>
                    <a style={{fontSize: "25px"}} href={'/candidates/'+record.id}><div style={{
                      // border: "solid var(--cat-blue) 3px",
                      // borderColor: catToProjColor(record.category),
                      // backgroundColor: catToProjColor(record.category),
                      height: "128px", width: "96px",  }}>
                      <img src={record.img} style={{height: "128px", width: "96px"}}></img>
                    </div></a>
                    <a style={{
                      // border: "solid var(--cat-blue) 3px",
                      // borderColor: catToProjColor(record.category),
                      // backgroundColor: catToColor(record.category),
                      padding: "10px",
                      maxWidth: "700px",
                      width: "100%",
                      color: "#111",
                      marginLeft: "4px",
                      }} href={'/candidates/'+record.id}>
                      <div>
                      <p style={{margin: 0, fontSize: "20px"}}>{record.name}</p>
                      <p style={{margin: 0, fontSize: "15px"}}>{record.district}</p>
                      <p style={{margin: 0, fontSize: "15px"}}>{record.organisation}</p>
                      <p style={{margin: 0, marginTop: "5px", fontSize: "20px"}}>{record.title}</p>
                    </div></a>
                  </div>)}

                {list.length === 0 && (
                    <p style={{textAlign: "center"}}>
                        Nincs találat. 
                    </p>
                )}
            </div>
        </div>
    );
}

export default List;
