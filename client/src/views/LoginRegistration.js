import React from "react";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Typewriter from "typewriter-effect";
import Particles from "react-tsparticles";
import "../styles/LoginRegistration.css";


const LoginRegistration = (props) => {

    const particlesInit = (main) => {
        console.log(main);
    };
    
    const particlesLoaded = (container) => {
        console.log(container);
    };

    return(

        <div className="wrapper">
        
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fpsLimit: 200,
                    interactivity: {
                    events: {
                        onClick: {
                        enable: true,
                        mode: "push",
                        },
                        onHover: {
                        enable: true,
                        mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        bubble: {
                        distance: 400,
                        duration: 0.2,
                        opacity: 0.5,
                        size: 40,
                        },
                        push: {
                        quantity: 4,
                        },
                        repulse: {
                        distance: 100,
                        duration: 0.2,
                        },
                    },
                    },
                    particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: false,
                        speed: 0.2,
                        straight: false,
                    },
                    number: {
                        density: {
                        enable: true,
                        area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "image",
                        "image": {
                            "src": "https://cdn.clipartsfree.net/vector/medium/54438-white-heart-outline-thick-images.png"
                        }
                    },
                    size: {
                        random: true,
                        value: 10,
                    },
                    },
                    detectRetina: true,
                }}
                />

                <h1>
                    <Typewriter 
                        onInit={(typewriter) => {typewriter.typeString("Compose").start();}} 
                    />
                </h1>
            
            <img src={require('../images/bears.png')} alt="bears-main" className="bears" />

                <div className="login-reg-box">
                    <h3> The 'bear' necesseties for all things noteworthy </h3> 

                    <div className="login-reg">
                        <Registration />
                        <Login />
                    </div>
                </div>

                <footer> 
                    © 2022 Compose | Seattle, Washington | All Rights Reserved. 
                </footer>

            </div>

    )
}

export default LoginRegistration;