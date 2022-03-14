import React,{useRef, useEffect, useState} from "react";
import axios from "axios";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { SliderPicker } from 'react-color';
import {navigate} from "@reach/router";
import "../styles/Canvas.css";


const Canvas = (props) => {

    const {doodles, setDoodles} = props;
    const [drawing, setDrawing] = useState("")
    const [user, setUser] = useState("");
    const [colorSwatch, setColorSwatch] = useState("#ff0000");
    const thisCanvas = useRef(null); 
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
    };

    const exportDrawing = () => {
        thisCanvas.current
            .exportImage("png")
            .then((res) => {
                console.log(res)
                setDrawing(res, ...drawing);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addDrawing = (e) => {
        e.preventDefault();

        // thisCanvas.current
        //     .exportImage("png")
        //     .then((res) => {
        //         console.log(res)
        //         setDrawing(res, ...drawing);
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        axios
            .post(`http://localhost:8000/api/drawings/${user.username}`, {
                image: drawing
            },
            {
                // forces sending of the credentials/cookies so they can be updated
                // XMLHttpRequest from a different domain cannot set cookie values for their own domain
                // unless withCredentials is set to true before making the request
                withCredentials: true,
            },
            )
            .then((res) => {
                console.log(res.data);
                console.log(res.data);
                console.log(" drawing sucess ")
                setDoodles([res.data, ...doodles]);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, // As a post request, we MUST send something with our request.
                // Because we're not adding anything, we can send a simple MT object 
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/")
            })
            .catch((err) => {
                console.log(err);
            })
    }

return (

    <div className="canvas-container"> 

        <img src={require('../images/spiral.png')} alt="spiral" className="spiral-bound" />

        <header2>
            <strong> Doodle</strong> 

            <button className="header" onClick={()=> navigate("/compose/dashboard")}> Dashboard </button>
            <button className="header" onClick={()=> navigate("/compose/gallery")}> Gallery </button>
            <button className="header" onClick ={logout}> Logout </button>

            <img src={require('../images/doodle.png')} alt="bears-doodle" className="bears-doodle" />
        </header2> 

        <div className="doodle-controller">

            <button className="controls" onClick={() => {thisCanvas.current.eraseMode(false);}}>
                Pen
            </button>

            <button className="controls" onClick={() => {thisCanvas.current.eraseMode(true);}}>
                Eraser
            </button>

            <button className="controls" onClick={() => {thisCanvas.current.undo();}}>
                Undo
            </button>

            <button className="controls" onClick={() => {thisCanvas.current.redo();}}>
                Redo
            </button>

            <button className="controls" onClick={() => {thisCanvas.current.resetCanvas();}}>
                Clear
            </button>

            <button className="controls" onClick= {exportDrawing} >
                Save
            </button>

            <button className="controls" onClick= {addDrawing} >
                Add to Gallery
            </button>

        </div><br></br>

        <SliderPicker
            color= {colorSwatch}
            onChangeComplete= {(color)=> {setColorSwatch(color.hex)}}
        /> <br></br>

        <div className="doodle">
            <ReactSketchCanvas
                ref= {thisCanvas}
                style= {styles}
                width= "100%"
                height= "800px"
                strokeWidth= {4}
                strokeColor= {colorSwatch}
                canvasColor= "#312B2A"
            />
        </div>

    </div>
)
}

export default Canvas;