import React from 'react';
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { changeBrushSize, changeColor } from '@/slice/toolboxSlice';
import cx from 'classnames';


const Toolbox = () => {

    const disptach = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem])


    const updateBrushSize = (e) => {
        disptach(changeBrushSize({ item: activeMenuItem, size: e.target.value }))
    }

    const updateColor = (newColor) => {
        disptach(changeColor({ item: activeMenuItem, color: newColor }))
    }

    // const ColorBox = ({ color }) => (
    //     <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.color })} style={{ backgroundColor: color }} onClick={() => updateColor(color)}></div>
    //     // <div className={styles.colorBox} style={{backgroundColor: COLORS.BLUE}}></div>
    // );

    return (
        <>
            <div className={styles.toolboxContainer}>
                {showStrokeToolOption &&
                    <div className={styles.toolItem}>
                        <h4 className={styles.toolText}>Stroke Color</h4>
                        <div className={styles.itemContainer}>
                            {/* {Object.values(COLORS).map((color, index) => (
                                <ColorBox key={index} color={color} />
                            ))} */}
                            {/* <div className={styles.colorBox} style={{backgroundColor: COLORS.BLACK}} /> */}
                            <div className={styles.itemContainer}>
                                <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLACK })} style={{ backgroundColor: COLORS.BLACK }} onClick={() => updateColor(COLORS.BLACK)} />
                                <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.RED })} style={{ backgroundColor: COLORS.RED }} onClick={() => updateColor(COLORS.RED)} />
                                <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.GREEN })} style={{ backgroundColor: COLORS.GREEN }} onClick={() => updateColor(COLORS.GREEN)} />
                                <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLUE })} style={{ backgroundColor: COLORS.BLUE }} onClick={() => updateColor(COLORS.BLUE)} />
                                <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.ORANGE })} style={{ backgroundColor: COLORS.ORANGE }} onClick={() => updateColor(COLORS.ORANGE)} />
                                <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.YELLOW })} style={{ backgroundColor: COLORS.YELLOW }} onClick={() => updateColor(COLORS.YELLOW)} />
                            </div>
                        </div>
                    </div>
                }

                {showBrushToolOption &&
                    <div className={styles.toolItem}>
                        <h4 className={styles.toolText}>Brush Size</h4>
                        <div className={styles.itemContainer}>
                            <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} className="" value={size}/>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Toolbox;