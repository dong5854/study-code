import React, { Component, useState } from "react";
import { Grid, TextField, FormControl } from "@mui/material";
import { withStyles } from "@mui/styles";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { Box } from "@mui/system";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import HomePage from "./HomePage";
import axios from "axios";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
let marginTop = 0;
if (window.innerHeight > 800) {
	marginTop = (window.innerHeight - 800) / 2;
}

const Title = styled.div`
	width: 323px;
	height: 86px;
	left: 18px;
	top: 78px;

	font-family: Montserrat;
	font-style: normal;
	font-weight: bold;
	font-size: 60px;
	line-height: 73px;
	display: flex;
	align-items: center;
	text-align: center;

	color: #4464d1;

	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	margin-left: 48px;
	margin-top: ${marginTop}px;
`;

const Description = styled.div`
	width: 537px;
	height: 60px;
	left: 63px;
	top: 191px;

	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 21px;

	color: #000000;
	margin-top: 25px;
	margin-left: 48px;
`;

const DescriptionEng = styled.div`
	width: 220px;
	height: 60px;
	left: 63px;
	top: 191px;

	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 21px;

	color: #000000;
	margin-top: -20px;
	margin-left: 48px;
	display: inline-block;
	vertical-align: top;
`;

const OfficeImg = styled.img`
	display: inline-block;
	margin-left: auto;
	float: right;
`;

const LeftBox = styled.div`
	backdrop-filter: blur(30px);
	position: absolute;
	height: 100%;
	width: 50%;
	z-index: 1;
`;

const RightBox = styled.div`
	backdrop-filter: blur(30px);
	position: absolute;
	height: 100%;
	width: 50%;
	z-index: 1;
	left: 50%;
`;

const WhiteBox = styled.div`
	display: flex;
	background-color: rgba(255, 255, 255, 0.45);
	width: 365px;
	height: 80.88px;
	border-radius: 50px;
	text-align: center;
	align-items: center;
	justify-content: center;
	margin-top: 130px;
`;

const SearchBox = withStyles({
	root: {
		width: "60%",
		marginTop: "20px",
		marginLeft: "30px",
	},
})(TextField);

const SearchIconButton = withStyles({
	root: {
		paddingTop: "17px",
		position: "relative",
		right: "50px",
	},
})(IconButton);

const ContentGrid = withStyles({
	root: {
		zIndex: "2",
	},
})(Grid);

const SearchButton = withStyles({
	root: {
		display: "block!important",
		margin: "auto!important",
	},
})(Button);

const DropDownItem = withStyles({
	root: {
		display: "block!important",
		textAlign: "center",
		color: "rgba(119, 145, 220, 1)!important",
	},
})(MenuItem);

function MainPage() {
	if((sessionStorage.getItem("user") === null) && (localStorage.getItem("user") === null)){
		alert("로그인 후 사용해주세요.")
		window.location.href = "/";
	}

	function logOut() {
		sessionStorage.clear();
		localStorage.clear();
		window.location.href = "/";
	}

	const engineList = ["네이버뉴스", "구글뉴스", "다음뉴스", "다나와"];

	const [keyword, setKeyword] = useState("");
	const [engine, setEngine] = React.useState("");
	const handleChange = (event) => {
		setEngine(event.target.value);
	};
	return (
		<>
			<Grid container>
				<LeftBox></LeftBox>
				<ContentGrid item xs={6}>
					<Title>DASH</Title>
					<Description style={{fontFamily: "GodoB"}}>
						업계 기술 및 시장 동향 파악과 마케팅 자동화 툴
					</Description>
					<DescriptionEng>
						Automatic Search Tool for
						<br /> Market Research{" "}
					</DescriptionEng>
					<OfficeImg src="/static/img/office_img.png"></OfficeImg>
				</ContentGrid>
				<ContentGrid item xs={6}>
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
					<WhiteBox style={{marginLeft: "40px"}}><div>Step 1 : 검색할 키워드와 검색엔진을 선택하세요</div><img src="/static/img/BrazucaSitting.png" style={{position: "absolute", marginLeft: "360px", marginBottom: "100px"}}></img></WhiteBox>
					<WhiteBox style={{marginLeft: "auto", marginRight: "40px"}}><div>Step 2 : 크롤링 결과를 한눈에 확인하세요</div><img src="/static/img/IsometricStickersCharts.png" style={{position: "absolute", marginLeft: "240px", marginBottom: "150px"}}></img></WhiteBox>
				</ContentGrid>
				<ContentGrid item xs={6} style={{fontFamily: "GodoB"}}>
					{" "}
					<Box
						component="form"
						style={{fontFamily: "GodoB"}}
						onSubmit={(e) => {
							e.preventDefault();
							// requestUrl(keyword);
							console.log(keyword);
							console.log("path");
							window.location.href =
								"/homepage?keyword=" +
								keyword +
								"&" +
								"engine=" +
								engine;
						}}
					>
						<SearchBox
							id="outlined-basic"
							style={{fontFamily: "GodoB"}}
							variant="outlined"
							label="검색 키워드"
							autoComplete="off"
							InputProps={{ style: { paddingRight: "40px", fontFamily: "GodoB" } }}
							InputLabelProps={{style: {fontFamily: "GodoB"}}}
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<SearchIconButton type="submit" aria-label="search">
							<SearchIcon />
						</SearchIconButton>
						{/* <SearchButton variant="outlined">Outlined</SearchButton> */}
						<Box
							sx={{
								minWidth: 100,
								display: "inline-flex",
								marginTop: "20px",
							}}
						>
							<FormControl fullWidth>
								<InputLabel id="select-label" style={{fontFamily: "GodoB"}}>
									엔진
								</InputLabel>
								<Select
									labelId="select-label"
									style={{fontFamily: "GodoB"}}
									id="select"
									value={engine}
									label="엔진"
									onChange={handleChange}
								>
									<DropDownItem value={engineList[0]} style={{fontFamily: 'GodoB'}}>
										{engineList[0]}
									</DropDownItem>
									<DropDownItem value={engineList[1]} style={{fontFamily: 'GodoB'}}>
										{engineList[1]}
									</DropDownItem>
									<DropDownItem value={engineList[2]} style={{fontFamily: 'GodoB'}}>
										{engineList[2]}
									</DropDownItem>
									<DropDownItem value={engineList[3]} style={{fontFamily: 'GodoB'}}>
										{engineList[3]}
									</DropDownItem>
								</Select>
							</FormControl>
						</Box>
					</Box>
				</ContentGrid>
				<ContentGrid item xs={6}>
				<WhiteBox style={{marginLeft: "40px"}}><div>Step 3 : 저장하고 공유하세요!</div><img src="/static/img/MoneyverseTransactionApproved.png" style={{position: "absolute", marginRight: "240px", marginBottom: "150px"}}></img></WhiteBox>
				</ContentGrid>
			</Grid>
		</>
	);
}

export default MainPage;
