import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
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
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "GodoB" !important;
  }
`;

const theme = createTheme({
	typography: {
		fontFamily: "GodoB",
	},
	overrides: {
		MuiTypography: {
			root: {
				fontFamily: "GodoB",
			},
			body2: {
				fontFamily: "GodoB",
			},
		},
	},
});

let loggedIn = false;
if (sessionStorage.getItem("user") != null) {
	loggedIn = true;
} else if (localStorage.getItem("user") != null) {
	loggedIn = true;
}

let marginTop = 0;
if (window.innerHeight > 800) {
	marginTop = (window.innerHeight - 800) / 2;
}
// const ContainerGrid = withStyles({
//     root: {
//         backgroundImage: "url('/static/img/main_img.jpg')",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center center",
//         backgrounSize: "100%",
//     },
// })(Grid);

const Container = styled.div`
	background-image: url("/static/img/main_img.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	backgroun-size: 100%;
	width: 100%;
`;

const ContentBox = styled.div`
	backdrop-filter: blur(30px);
	position: absolute;
	height: 100%;
	width: 100%;
`;

const Title = styled.h1`
	font-family: Montserrat;
	font-size: 60px;
	font-style: normal;
	font-weight: 700;
	line-height: 73px;
	letter-spacing: 0em;
	text-align: center;
	margin-top: ${marginTop}px;
	text-shadow: 1px 1px 2px gray;
`;

const App = () => {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route path="/signup">
							<Container>
								<ContentBox>
									<Title>DASH</Title>
									<SignUpPage></SignUpPage>
								</ContentBox>
							</Container>
						</Route>
						<Route path="/signin">
							<Container>
								<ContentBox>
									<Title>DASH</Title>
									<SignInPage></SignInPage>
								</ContentBox>
							</Container>
						</Route>
						<Route path="/mainpage">
							<Container>
								<MainPage></MainPage>
							</Container>
						</Route>
						<Route path="/homepage" component={HomePage} />
						<Route path="/result" component={ResultPage} />
						<Route path="/analysis" component={AnalysisPage} />
						<Route path="/">
							{loggedIn ? (
								<Redirect to="/mainpage" />
							) : (
								<Redirect to="/signin" />
							)}
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</>
	);
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
