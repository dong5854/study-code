import React, { Component,useState } from "react";
import { Grid, TextField,FormControl } from "@mui/material";
import { withStyles } from "@mui/styles";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { Box } from "@mui/system";
import SearchIcon from "@material-ui/icons/Search";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

let marginTop = 0;
if (window.innerHeight > 800){
    marginTop = (window.innerHeight-800)/2;
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

		color: #4464D1;

		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		margin-left: 48px;
        margin-top: ${marginTop}px;
`

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
`

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
`

const OfficeImg = styled.img`
	display: inline-block;
	margin-left: auto;
	float: right;
`

const LeftBox = styled.div`
        backdrop-filter: blur(30px);
        position: absolute;
        height: 100%;
        width: 50%;
		z-index: 1;
`

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
	const [keyword, setKeyword] = useState("");
	const [engine, setEngine] = React.useState('');
	const handleChange = (event) => {
		setEngine(event.target.value);
	};
	return (<>
	<Grid container>
		<LeftBox></LeftBox>
		<ContentGrid item xs={6}>
			<Title>DASH</Title>
			<Description>업계 기술 및 시장 동향 파악과 마케팅 자동화 툴</Description>
			<DescriptionEng>Automatic Search Tool for<br/> Market Research </DescriptionEng>
			<OfficeImg src="/static/img/office_img.png"></OfficeImg>
			<Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // requestUrl(keyword);
                        console.log(keyword);
                    }}
                >
			<SearchBox
				id="outlined-basic"
				variant="outlined"
				label="검색 키워드"
				autoComplete="off"
				InputProps={{ style: { paddingRight: "40px" } }}
				onChange={(e) => setKeyword(e.target.value)} />
			<SearchIconButton type="submit" aria-label="search">
			<SearchIcon />
			</SearchIconButton>
			{/* <SearchButton variant="outlined">Outlined</SearchButton> */}
			<Box sx={{ minWidth: 100, display: "inline-flex", marginTop: "20px"}}>
      		<FormControl fullWidth>
        	<InputLabel id="select-label">engine</InputLabel>
        	<Select
          	labelId="select-label"
          	id="select"
          	value={engine}
          	label="engine"
          	onChange={handleChange}
        	>
          	<DropDownItem value={"네이버뉴스"}>네이버뉴스</DropDownItem>
          	<DropDownItem value={"구글뉴스"}>구글뉴스</DropDownItem>
          	<DropDownItem value={"트위터"}>트위터</DropDownItem>
			<DropDownItem value={"다나와"}>다나와</DropDownItem>
        	</Select>
      		</FormControl>
    		</Box>
			</Box>
		</ContentGrid>
		<ContentGrid item xs={6}>
		</ContentGrid>
	</Grid>
	</>);
}

export default MainPage;