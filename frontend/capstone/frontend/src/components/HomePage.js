import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import { FormControl } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@mui/material/Box";
import ResultPage from "./ResultPage";
import AnalysisPage from "./AnalysisPage";
import ProConPage from "./ProConPage";
import axios from "axios";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PeopleIcon from "@mui/icons-material/People";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useLocation } from "react-router-dom";

const BlackTextTypography = withStyles({
	root: {
		color: "#000000",
		paddingBottom: "10px",
		fontFamily: "Montserrat",
		fontSize: "30px",
		fontStyle: "normal",
		fontWeight: "700",
		lineHeight: "37px",
		marginLeft: "45px",
		display: "inline-flex",
		textShadow: "1px 1px 2px gray",
	},
})(Typography);

const SearchTextField = withStyles({
	root: {
		width: "50%",
		marginLeft: "48px",
	},
})(TextField);

const SearchIconButton = withStyles({
	root: {
		position: "relative",
		right: "50px",
		height: "55px",
	},
})(IconButton);

const Container = withStyles({
	root: {
		backgroundColor: "#F5FAFD",
		//backgroundSize: "cover",
		//backgroundRepeat: "no-repeat",
		//backgroundPosition: "center center",
		//backgrounSize: "100%",
	},
})(Grid);

const InlineBox = withStyles({
	root: {
		// marginTop: "1.5rem",
	},
})(Box);

const DropDownItem = withStyles({
	root: {
		display: "block!important",
		textAlign: "center",
		color: "rgba(119, 145, 220, 1)!important",
	},
})(MenuItem);

const SelectBtn = withStyles({
	root: {},
})(Button);

const statusList = ["none", "result", "analysis", "procon"];

function changeResult(status) {
	if (status == statusList[0]) {
	} else if (status == statusList[1]) {
		return <ResultPage />;
	} else if (status == statusList[2]) {
		return <AnalysisPage />;
	} else if (status == statusList[3]) {
		return <ProConPage />;
	}
}

function HomePage() {
	if (
		sessionStorage.getItem("user") === null &&
		localStorage.getItem("user") === null
	) {
		alert("로그인 후 사용해주세요.");
		window.location.href = "/";
	}

	const searchKeyword = new URLSearchParams(window.location.search).get(
		"keyword"
	);
	const searchEngine = new URLSearchParams(window.location.search).get(
		"engine"
	);
	const engineList = ["네이버뉴스", "구글뉴스", "다음뉴스", "다나와"];

	if (
		searchKeyword === null ||
		searchKeyword === "" ||
		searchKeyword === undefined ||
		engineList.includes(searchEngine) === false
	) {
		alert("잘못된 접근입니다.");
		window.location.href = "/";
	}

	const [keyword, setKeyword] = useState(searchKeyword);
	const [status, setStatus] = useState(statusList[1]);
	const [engine, setEngine] = React.useState(searchEngine);

	const handleChange = (event) => {
		setEngine(event.target.value);
	};

	function clickBtnHandler(e) {
		const newKeyword = new URLSearchParams(window.location.search).get(
			"keyword"
		);
		const newEngine = new URLSearchParams(window.location.search).get(
			"engine"
		);
		setKeyword(newKeyword);
		setEngine(newEngine);
		document.querySelector("#searchbox").value = newKeyword;
		document.querySelector("#selectengine").innerHTML = newEngine;
		let targetId = e.target.closest(".MuiButtonBase-root").id;
		document.querySelectorAll(
			".MuiBottomNavigation-root > .MuiButtonBase-root"
		)[0].style.color = "";
		document.querySelectorAll(
			".MuiBottomNavigation-root > .MuiButtonBase-root"
		)[1].style.color = "";
		document.querySelectorAll(
			".MuiBottomNavigation-root > .MuiButtonBase-root"
		)[2].style.color = "";
		e.target.closest(".MuiButtonBase-root").style.color = "#7791DC";
		if (targetId === "resultBtn") {
			setStatus(statusList[1]);
		} else if (targetId === "analysisBtn") {
			setStatus(statusList[2]);
		} else if (targetId === "proconBtn") {
			setStatus(statusList[3]);
		}
	}

	function resetNavi() {
		document.querySelectorAll(
			".MuiBottomNavigation-root > .MuiButtonBase-root"
		)[0].style.color = "#7791DC";
		document.querySelectorAll(
			".MuiBottomNavigation-root > .MuiButtonBase-root"
		)[1].style.color = "";
		document.querySelectorAll(
			".MuiBottomNavigation-root > .MuiButtonBase-root"
		)[2].style.color = "";
	}

	function insertUrlParam(key, value) {
		if (history.pushState) {
			let searchParams = new URLSearchParams(window.location.search);
			searchParams.set(key, value);
			let newurl =
				window.location.protocol +
				"//" +
				window.location.host +
				window.location.pathname +
				"?" +
				searchParams.toString();
			window.history.pushState({ path: newurl }, "", newurl);
		}
	}

	function logOut() {
		sessionStorage.clear();
		localStorage.clear();
		window.location.href = "/";
	}

	return (
		<Container container spacing={1} style={{ overflowY: "scroll" }}>
			<Grid item xs={12}>
				<InlineBox
					component="div"
					display="inline-flex"
					sx={{ m: "2rem" }}
				>
					<BlackTextTypography
						component="h4"
						variant="h4"
						style={{ cursor: "pointer" }}
						onClick={() => (window.location.href = "/mainpage")}
					>
						D A S H
					</BlackTextTypography>
				</InlineBox>
				<InlineBox
					component="form"
					display="inline-flex"
					onSubmit={(e) => {
						e.preventDefault();
						// requestUrl(keyword);
						// console.log("keyword", keyword);
						setStatus(statusList[1]);
						insertUrlParam("keyword", keyword);
						insertUrlParam("engine", engine);
						// document.querySelector("#selectengine").innerHTML =
						// 	engine;
						resetNavi();
						window.location.reload();
					}}
				>
					<SearchTextField
						id="searchbox"
						variant="outlined"
						label="검색 키워드"
						autoComplete="off"
						defaultValue={searchKeyword}
						InputProps={{
							style: {
								paddingRight: "40px",
								fontFamily: "GodoB",
							},
						}}
						InputLabelProps={{ style: { fontFamily: "GodoB" } }}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					<SearchIconButton type="submit" aria-label="search">
						<SearchIcon />
					</SearchIconButton>
					<Box
						sx={{
							minWidth: 130,
							display: "inline-flex",
							marginRight: "50px",
						}}
					>
						<FormControl fullWidth>
							<InputLabel
								id="select-label"
								style={{ fontFamily: "GodoB" }}
							>
								엔진
							</InputLabel>
							<Select
								labelId="select-label"
								style={{ fontFamily: "GodoB" }}
								id="selectengine"
								value={engine}
								label="엔진"
								sx={{ position: "absoulute" }}
								onChange={handleChange}
							>
								<DropDownItem
									value={"네이버뉴스"}
									style={{ fontFamily: "GodoB" }}
								>
									네이버뉴스
								</DropDownItem>
								<DropDownItem
									value={"구글뉴스"}
									style={{ fontFamily: "GodoB" }}
								>
									구글뉴스
								</DropDownItem>
								<DropDownItem
									value={"다음뉴스"}
									style={{ fontFamily: "GodoB" }}
								>
									다음뉴스
								</DropDownItem>
								<DropDownItem
									value={"다나와"}
									style={{ fontFamily: "GodoB" }}
								>
									다나와
								</DropDownItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ width: 500 }}>
						<BottomNavigation
							showLabels
							value={status}
							onChange={clickBtnHandler}
						>
							<BottomNavigationAction
								id="resultBtn"
								style={{ color: "#7791DC" }}
								label="크롤링 결과"
								icon={<FindInPageIcon />}
							/>
							<BottomNavigationAction
								id="analysisBtn"
								style={{}}
								label="분석 결과"
								icon={<AnalyticsIcon />}
							/>
							<BottomNavigationAction
								id="proconBtn"
								style={{}}
								label="긍정부정"
								icon={<PeopleIcon />}
							/>
						</BottomNavigation>
					</Box>
				</InlineBox>
				<Button
					variant="text"
					style={{
						marginTop: "2.5rem",
						marginRight: "4rem",
						fontFamily: "'GodoB'",
						float: "right",
					}}
					onClick={logOut}
				>
					로그아웃
				</Button>
				<hr
					style={{
						width: "95%",
						color: "#7791DC",
						backgroundColor: "#7791DC",
						height: "1px",
					}}
				></hr>
			</Grid>
			<Grid item xs={2}></Grid>
			<Grid item xs={8}></Grid>
			<Grid item xs={2}></Grid>
			<Grid item xs={12} align="center">
				{changeResult(status)}
			</Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
			<Grid item xs={12}></Grid>
		</Container>
	);
}

export default HomePage;
