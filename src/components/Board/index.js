import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Board = () => {
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

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

        const drawLine = (x,y) => {
            context.lineTo(x, y);       // create line from this coords
            context.stroke();   
        }

        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);         // start from this particular point
         };
        const handleMouseMove = (e) => {
            if(!shouldDraw.current) return;
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