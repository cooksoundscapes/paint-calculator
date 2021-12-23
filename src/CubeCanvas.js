import React, { useEffect, useRef, useState } from "react";

const CubeCanvas = props => {
    const canvas = useRef();
    const [edges, setEdge] = useState(
        {
            X: 200,
            Y: 200,
            NW: [0, 0],
            NE: [50, 0],
            SW: [0, 50],
            SE: [50, 50],
            Left: 50, 
            Right: 50, 
            Top: 50, 
            Bottom: 50,
            lean: 50
        }
    )
    
    useEffect( function draw() {
        const {X, Y, NW, NE, SW, SE, Left, Right, Top, Bottom, lean} = edges;
        const cnv = canvas.current;
        const ctx = cnv.getContext("2d");
        ctx.resetTransform();
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeColor = "black";
        ctx.lineCap = "round";
        ctx.translate(X, Y);
        //draw base square;
        ctx.moveTo(NW[0]+lean, NW[1]);
        ctx.lineTo(NE[0]+lean, NE[1]);
        ctx.lineTo(SE[0], SE[1]);
        ctx.lineTo(SW[0], SW[1]);
        ctx.lineTo(NW[0]+lean, NW[1]);
        //draw upper square;
        ctx.moveTo(SW[0], SW[1]-Left);
        ctx.lineTo(NW[0]+lean, NW[1]-Left);
        ctx.lineTo(NW[0]+lean, NW[1]-Top);
        ctx.lineTo(NE[0]+lean, NE[1]-Top);
        ctx.lineTo(NE[0]+lean, NE[1]-Right);
        ctx.lineTo(SE[0], SE[1]-Right);
        ctx.lineTo(SE[0], SE[1]-Bottom);
        ctx.lineTo(SW[0], SW[1]-Bottom);
        ctx.closePath();
        //draw vertical edges;
        ctx.moveTo(NW[0]+lean, NW[1]);
        ctx.lineTo(NW[0]+lean, NW[1]-Left);
        ctx.moveTo(NE[0]+lean, NE[1]);
        ctx.lineTo(NE[0]+lean, NE[1]-Right);
        ctx.moveTo(SW[0], SW[1]);
        ctx.lineTo(SW[0], SW[1]-Left);
        ctx.moveTo(SE[0], SE[1]);
        ctx.lineTo(SE[0], SE[1]-Right);
        ctx.stroke(); 
    })

    const moveCube = (e) => {
        let [param, index] = e.target.id.split("_");
        let value = e.target.value;
        console.log(param, index)
        if (!index) {
            setEdge(prev => ({
                ...prev, 
                [param]: parseInt(value)
            }))
        } else {
            const clone = [...edges[param]];
            clone[index] = parseInt(value);
            setEdge(prev => ({
                ...prev,
                [param]: clone
            }))
        }
    }

    const GenerateSliders = () => {
        const coords = Object.entries(edges);
        const s = [];
        for (let obj of coords) {
            //if entry is an coordinate, separate it;
            if (Array.isArray(obj[1])) {
                obj[1].forEach ((p, i) => s.push(obj[0]+"_"+i));
            } else {
                s.push(obj[0]);
            }
        }
        return s.map( s => (
            <div style={{display: 'flex'}} key={s}>
            <label style={{flex: 1}}>{s}</label>
            <input type='range' min='-400' max='400' 
                onChange={e => moveCube(e)} id={s} key={s} />
            </div>
        ))
    }
 
    return (
        <div style={{display: 'flex'}}>
            <canvas ref={canvas} width='800' height='600' 
                style={{backgroundColor: "#e2e2e2", flex: 1}}/>
            <div style={{display: "flex", flexDirection: "column", flex: .25, gap: 10}}>
                {GenerateSliders()}
            </div>
        </div>
    )
}

export default CubeCanvas;