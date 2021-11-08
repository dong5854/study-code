import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import ResultPage from "./ResultPage";
import AnalysisPage from "./AnalysisPage";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import Particles from "react-tsparticles";
import styled from "styled-components";

const Back = styled.div`
	z-index: -999;
`;

const options = {
	fpsLimit: 60,
	background: {
		color: {
			value: "#fff",
		},
	},
	particles: {
		number: {
			value: 0,
			density: {
				enable: false,
				value_area: 800,
			},
		},
		color: {
			value: "#fff",
		},
		shape: {
			type: "circle",
			stroke: {
				width: 0,
				color: "#fff",
			},
			polygon: {
				nb_sides: 5,
			},
			image: {
				src: "https://cdn.matteobruni.it/images/particles/github.svg",
				width: 100,
				height: 100,
			},
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: false,
				speed: 1,
				opacity_min: 0.1,
				sync: false,
			},
		},
		size: {
			value: 5,
			random: true,
			anim: {
				enable: false,
				speed: 40,
				size_min: 0.1,
				sync: false,
			},
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: "#fff",
			opacity: 0.4,
			width: 1,
		},
		move: {
			enable: true,
			speed: 2,
			direction: "top",
			random: false,
			straight: true,
			out_mode: "out",
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: false,
				mode: "repulse",
				parallax: {
					enable: false,
					force: 60,
					smooth: 10,
				},
			},
			onclick: {
				enable: false,
				mode: "push",
			},
			resize: true,
		},
		modes: {
			grab: {
				distance: 400,
				line_linked: {
					opacity: 1,
				},
			},
			bubble: {
				distance: 400,
				size: 40,
				duration: 2,
				opacity: 0.8,
				speed: 3,
			},
			repulse: {
				distance: 200,
			},
			push: {
				particles_nb: 4,
			},
			remove: {
				particles_nb: 2,
			},
		},
	},
	retina_detect: true,
	emitters: [
		{
			direction: "top",
			position: {
				x: 100 / 6,
				y: 100,
			},
			rate: {
				delay: 0.05,
				number: 50,
			},
			size: {
				width: 100 / 3,
				height: 100,
			},
			particles: {
				color: {
					value: "#00ff00",
				},
				size: {
					value: 5,
				},
				links: {
					id: "green",
					color: "#00ff00",
					enable: true,
				},
				opacity: {
					value: 0.5,
				},
				move: {
					speed: 2,
					angle: 30,
					random: true,
					straight: true,
					outMode: "destroy",
				},
			},
		},
		{
			direction: "top",
			position: {
				x: 50,
				y: 100,
			},
			rate: {
				delay: 0.05,
				number: 50,
			},
			size: {
				width: 100 / 3,
				height: 100,
			},
			particles: {
				color: {
					value: "#ffffff",
				},
				size: {
					value: 5,
				},
				links: {
					enable: true,
					id: "white",
					color: "#ffffff",
				},
				opacity: {
					value: 0.5,
				},
				move: {
					speed: 2,
					random: true,
					angle: 30,
					straight: true,
					outMode: "destroy",
				},
			},
		},
		{
			direction: "top",
			position: {
				x: 500 / 6,
				y: 100,
			},
			rate: {
				delay: 0.05,
				number: 50,
			},
			size: {
				width: 100 / 3,
				height: 100,
			},
			particles: {
				color: {
					value: "#ff0000",
				},
				size: {
					value: 5,
				},
				links: {
					enable: true,
					id: "red",
					color: "#ff0000",
				},
				opacity: {
					value: 0.5,
				},
				move: {
					speed: 2,
					angle: 30,
					random: true,
					straight: true,
					outMode: "destroy",
				},
			},
		},
	],
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
					<Route path="/result" component={ResultPage} />
					<Route path="/analysis" component={AnalysisPage} />
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</Router>
		</>
	);
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
