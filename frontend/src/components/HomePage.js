import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import {
    Button,
    Grid,
    Typography,
    TextField,
} from "@material-ui/core";
import { FormControl } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@mui/material/Box';
import ResultPage from "./ResultPage";
import AnalysisPage from "./AnalysisPage";
import ProPage from "./ProPage";
import ConPage from "./ConPage";
import axios from 'axios';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import styled from "styled-components";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
        marginLeft: "48px"
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
    root: {
    },
})(Button);

const statusList = ["none", "result", "analysis", "procon" ];

function changeResult(status){
    if(status == statusList[0]){
        console.log("빌드 완료(none)");
    } else if(status == statusList[1]){
        console.log("빌드 완료(result)");
        return <ResultPage />;
    } else if(status == statusList[2]){
        console.log("빌드 완료(pro)");
        return <ProPage />;
    } else if(status == statusList[3]){
        console.log("빌드 완료(con)");
        return <ConPage />;
    }else if(status == statusList[4]){
        console.log("빌드 완료(analysis)");
        return  <AnalysisPage />;
    }
}
function HomePage() {
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState(statusList[1]);
    useEffect(() => {
        console.log("status: ", status);
        changeResult(status);
      }, [status]);
    const [engine, setEngine] = React.useState('');
    const handleChange = (event) => {
        setEngine(event.target.value);
    };

      function clickBtnHandler(e){
          let targetId = e.target.closest(".MuiButtonBase-root").id;
          console.log(document.querySelectorAll(".MuiBottomNavigation-root > .MuiButtonBase-root")[0]);
          document.querySelectorAll(".MuiBottomNavigation-root > .MuiButtonBase-root")[0].style.color = "";
          document.querySelectorAll(".MuiBottomNavigation-root > .MuiButtonBase-root")[1].style.color = "";
          document.querySelectorAll(".MuiBottomNavigation-root > .MuiButtonBase-root")[2].style.color = "";
          e.target.closest(".MuiButtonBase-root").style.color = "#7791DC";
          if(targetId === "resultBtn"){
            setStatus(statusList[1]);
          } else if(targetId === "analysisBtn"){
            setStatus(statusList[2]);
          } else if(targetId === "proconBtn"){
              setStatus(statusList[3]);
          }
      }

    function requestUrl(keyword){
        console.log("requset?", keyword)
        
        const requestOptions = {
            url :'/api/find-result',
            method:'POST',
            header:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            data:{
                keyword:keyword,
            }
        }

            axios(requestOptions).then(response => console.log(response))
    }


    return (
        <Container container spacing={1}>
            <Grid item xs={12}>
                <InlineBox component="div" display="inline-flex" sx={{ m: "2rem" }}>
                    <BlackTextTypography component="h4" variant="h4">
                        D A S H
                    </BlackTextTypography>
                </InlineBox>
                <InlineBox
                    component="form"
                    display="inline-flex"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // requestUrl(keyword);
                        //console.log(keyword);
                        setStatus(statusList[1]);
                    }}
                >
                        <SearchTextField
                            id="outlined-basic"
                            variant="outlined"
                            label="검색 키워드"
                            autoComplete="off"
                            InputProps={{ style: { paddingRight: "40px" } }}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <SearchIconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </SearchIconButton>
                    <Box sx={{ minWidth: 130, display: "inline-flex", marginRight: "50px"}}>
      		<FormControl fullWidth>
        	<InputLabel id="select-label">engine</InputLabel>
        	<Select
          	labelId="select-label"
          	id="select"
          	value={engine}
          	label="engine"
            sx={{ position: "absoulute"}}
          	onChange={handleChange}
        	>
          	<DropDownItem value={"네이버뉴스"}>네이버뉴스</DropDownItem>
          	<DropDownItem value={"구글뉴스"}>구글뉴스</DropDownItem>
          	<DropDownItem value={"트위터"}>트위터</DropDownItem>
            <DropDownItem value={"다나와"}>다나와</DropDownItem>
        	</Select>
      		</FormControl>
    		</Box>
            <Box sx={{ width: 500 }}>
            <BottomNavigation
                showLabels
                value={status}
                onChange={clickBtnHandler}
            >
                <BottomNavigationAction id="resultBtn" style={{color: "#7791DC"}} label="Result" icon={<RestoreIcon />} />
                <BottomNavigationAction id="analysisBtn" style={{}} label="Analysis" icon={<FavoriteIcon />} />
                <BottomNavigationAction id="proconBtn" style={{}} label="ProCon" icon={<LocationOnIcon />} />
            </BottomNavigation>
            </Box>
            </InlineBox>
            <hr style={{width: "95%", color: "#7791DC", backgroundColor: "#7791DC", height: "1px"}}></hr>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} align="center">
                {changeResult(status)}
            </Grid>
            <Grid item xs={2}></Grid>
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
