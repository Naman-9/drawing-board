import React from 'react';
import styles from "./index.module.css";
import { COLORS } from '@/constants';

const Toolbox = () => {

    const updateBrushSize = (E) => {

    }

    const ColorBox = ({ color }) => (
        <div className={styles.colorBox} style={{ backgroundColor: color }}></div>
        // <div className={styles.colorBox} style={{backgroundColor: COLORS.BLUE}}></div>|||||||
    );

    return (
        <>
            <div className={styles.toolboxContainer}>
                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Stroke Color</h4>
                    <div className={styles.itemContainer}>
                        {Object.values(COLORS).map((color, index) => (
                            <ColorBox key={index} color={color} />
                        ))}
                        {/* <div className={styles.colorBox} style={{backgroundColor: COLORS.BLACK}} /> */}

                    </div>
                </div>

                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Brush Size</h4>
                    <div className={styles.itemContainer}>
                        <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} className="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Toolbox;