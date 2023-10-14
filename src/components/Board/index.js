import { MENU_ITEMS } from '@/constants';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuItemClick, actionItemClick } from '@/slice/menuSlice';


const Board = () => {
    const disptach = useDispatch();
    const canvasRef = useRef(null);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);
    const shouldDraw = useRef(false);
    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);



    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();  // returns a data URL containing a representation of the image in the format specified 
            const anchor = document.createElement('a');
            anchor.href = URL;
            anchor.download = 'sketch.jpg';   // name of file
            anchor.click();
        } else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1;    // 
            if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1;    // 
            const imageData = drawHistory.current[historyPointer.current];
            context.putImageData(imageData, 0, 0);  // puts the image data on canvas starting from 0,0
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

            // Undo Feature -- onmouseUp > capture image data > push to the array > if undo clckd point to arry -1
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height); // start from 0,0 to entire canvas
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;         // cannot use pop() as we need to implement redo feature
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