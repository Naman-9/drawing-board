import React from 'react';
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from '@/constants';
import { useSelector } from 'react-redux';

const Toolbox = () => {

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    const updateBrushSize = (e) => {

    }

    const ColorBox = ({ color }) => (
        <div className={styles.colorBox} style={{ backgroundColor: color }}></div>
        // <div className={styles.colorBox} style={{backgroundColor: COLORS.BLUE}}></div>
    );

    return (
        <>
            <div className={styles.toolboxContainer}>
                {showStrokeToolOption &&
                    <div className={styles.toolItem}>
                        <h4 className={styles.toolText}>Stroke Color</h4>
                        <div className={styles.itemContainer}>
                            {Object.values(COLORS).map((color, index) => (
                                <ColorBox key={index} color={color} />
                            ))}
                            {/* <div className={styles.colorBox} style={{backgroundColor: COLORS.BLACK}} /> */}

                        </div>
                    </div>
                }

                {showBrushToolOption &&
                    <div className={styles.toolItem}>
                        <h4 className={styles.toolText}>Brush Size</h4>
                        <div className={styles.itemContainer}>
                            <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} className="" />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Toolbox;