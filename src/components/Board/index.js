import { MENU_ITEMS } from '@/constants';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuItemClick, actionItemClick } from '@/slice/menuSlice';


const Board = () => {
    const disptach = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);



    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if(actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();  // returns a data URL containing a representation of the image in the format specified 
            const anchor = document.createElement('a');
            anchor.href = URL;
            anchor.download = 'sketch.jpg';   // name of file
            anchor.click(); 
        }
        // here "actionMenuItem" will create pblm as download value is set to download and on clkg 2nd time it won't work. tf, update to null required.
        disptach(actionItemClick(null));
    }, [actionMenuItem, disptach]);


    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const changeConfig = () => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }


        changeConfig();

    }, [color, size])

    /**These useEffects will overlap and strokeStyle and lineWidth will loose their prop.
     * tf, using "useLayoutEffect" this runs before the useEffect.
     * "useLayoutEffect" ideal for calc the ht and wth of component...
     */

    //   before browser paints
    useLayoutEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /**
         *  context.beginPath();                          // tells canvas to create new path and u get ready
         *  context.moveTo(e.clientX, e.clientY);
         *  context.lineTo(e.clientX, e.clientY);       // create line from this coords
         *  context.stroke();                           // stroke(line) the path
         * 
         * if beginPath() not mentioned then it will start from last coords.
         * beginPath needs moveTo()  
         */
        const beginPath = (x, y) => {
            context.beginPath();                          // tells canvas to create new path and u get ready
            context.moveTo(x, y);
        }

        const drawLine = (x, y) => {
            context.lineTo(x, y);       // create line from this coords
            context.stroke();
        }

        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);         // start from this particular point
        };
        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;
            drawLine(e.clientX, e.clientY);       // create line from this coords
        };
        const handleMouseup = (e) => {
            shouldDraw.current = false;
        };

        canvas.addEventListener('mousedown', handleMouseDown);      // mouse clicked
        canvas.addEventListener('mousemove', handleMouseMove);      // moving
        canvas.addEventListener('mouseup', handleMouseup);          // releasing

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);      // mouse clicked
            canvas.removeEventListener('mousemove', handleMouseMove);      // moving
            canvas.removeEventListener('mouseup', handleMouseup);          // releasing

        }
    }, []);

    console.log(color, size);


    return (
        <>
            <canvas ref={canvasRef} ></canvas>
        </>
    )
}

export default Board;