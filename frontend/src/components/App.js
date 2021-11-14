import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import ResultPage from "./ResultPage";
import AnalysisPage from "./AnalysisPage";
import SignUpPage from "./signUpPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Particles from "react-tsparticles";
import styled from "styled-components";
import SignInPage from "./singInPage";

const Back = styled.div`
    z-index: -999;
`;

const loggedIn = false;

const options = {
    fpsLimit: 60,
    fullScreen: { enable: true },
    particles: {
        number: {
            value: 50,
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: 400,
            random: {
                enable: true,
                minimumValue: 200,
            },
        },
        move: {
            enable: true,
            speed: 10,
            direction: "top",
            outMode: "destroy",
        },
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            resize: true,
        },
    },
    detectRetina: true,
    themes: [
        {
            name: "light",
            default: {
                value: true,
                mode: "light",
            },
            options: {
                background: {
                    color: "#f7f8ef",
                },
                particles: {
                    color: {
                        value: [
                            "#5bc0eb",
                            "#fde74c",
                            "#9bc53d",
                            "#e55934",
                            "#fa7921",
                        ],
                    },
                },
            },
        },
        {
            name: "dark",
            default: {
                value: true,
                mode: "dark",
            },
            options: {
                background: {
                    color: "#080710",
                },
                particles: {
                    color: {
                        value: [
                            "#004f74",
                            "#5f5800",
                            "#245100",
                            "#7d0000",
                            "#810c00",
                        ],
                    },
                },
            },
        },
    ],
    emitters: {
        direction: "top",
        position: {
            x: 50,
            y: 150,
        },
        rate: {
            delay: 0.2,
            quantity: 2,
        },
        size: {
            width: 100,
            height: 0,
        },
    },
};

const App = () => {
    const particlesInit = (main) => {
        console.log(main);
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <>
            <Back>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={options}
                />
            </Back>
            <Router>
                <Switch>
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/signin" component={SignInPage} />
                    <Route path="/homepage" component={HomePage} />
                    <Route path="/result" component={ResultPage} />
                    <Route path="/analysis" component={AnalysisPage} />
                    <Route path="/">
                        {loggedIn ? (
                            <Redirect to="/homepage" />
                        ) : (
                            <Redirect to="/signin" />
                        )}
                    </Route>
                </Switch>
            </Router>
        </>
    );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
