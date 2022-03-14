import React, {useState, useEffect} from "react";
import axios from "axios";
import {navigate} from "@reach/router";
import { MdDeleteForever } from "react-icons/md";
import "../styles/Gallery.css";


const Gallery = (props) => {

    const [doodles, setDoodles] = useState([]);
    const [user, setUser] = useState("");
    const [visibleDrawings, setVisibleDrawings] = useState(6);

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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/drawings/${user.username}`,
            { withCredentials:true })
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setDoodles(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

    const loadMoreDrawings = () => {
        setVisibleDrawings((prevValue) => prevValue + 3);
    }

    const deleteDrawing = (doodleId) => {
        axios.delete(`http://localhost:8000/api/drawings/${doodleId}`)
        .then((res)=> { 
            console.log(res);
            console.log(res.data);
            setDoodles(doodles.filter((doodle, index)=>doodle._id !== doodleId))
        })
        .catch((err)=> console.log(err))
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

    return(

        <div className="gallery">
        
            <img src={require('../images/spiral.png')} alt="spiral" className="spiral-bound" />

            <header3>
                <strong> Gallery</strong> 

                <button className="header" onClick={()=> navigate("/compose/dashboard")}> Dashboard </button>
                <button className="header" onClick={()=> navigate("/compose/doodle")}> Doodle </button>
                <button className="header" onClick ={logout}> Logout </button>

                <img src={require('../images/gallery.png')} alt="bears-doodle" className="bears-doodle" />
            </header3> 

            <div className="drawing-list" >

                {
                    doodles.slice(0,visibleDrawings).map((doodle,index)=> (

                        <div key={doodle._id} className="drawing">

                            <img className="image" src={doodle.image} />

                            <div className= "drawing-footer">
                                {doodle.date} <br></br>
                                <MdDeleteForever className="delete-icon" onClick={()=> deleteDrawing(doodle._id)}/>
                            </div>

                        </div>
                    
                    ))
                }
                
            </div>

            <button className="load-drawings" onClick={loadMoreDrawings}> LOAD MORE DRAWINGS...</button>

        </div>
    )
}

export default Gallery;