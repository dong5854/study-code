import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import {
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    makeStyles,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Box } from "@mui/system";
import ResultPage from "./ResultPage";
import AnalysisPage from "./AnalysisPage";
import ProPage from "./ProPage";
import ConPage from "./ConPage";
import axios from 'axios';

const BlackTextTypography = withStyles({
    root: {
        color: "#000000",
        paddingBottom: "10px",
    },
})(Typography);

const SearchTextField = withStyles({
    root: {
        width: "1000px",
        marginLeft: "48px"
    },
})(TextField);

const SearchIconButton = withStyles({
    root: {
        paddingTop: "17px",
        position: "relative",
        right: "50px",
    },
})(IconButton);

const statusList = ["none", "result", "pro", "con", "analysis"];

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
    const [status, setStatus] = useState(statusList[0]);
    useEffect(() => {
        console.log("status: ", status);
        changeResult(status);
      }, [status]);

      function clickPro(){
        setStatus(statusList[2]);
      }
      function clickCon(){
        setStatus(statusList[3]);
      }
      function clickAnalysis(){
        setStatus(statusList[4]);
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
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Box clone mt="3rem">
                    <BlackTextTypography component="h4" variant="h4">
                        대쉬
                    </BlackTextTypography>
                </Box>
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // requestUrl(keyword);
                        //console.log(keyword);
                        setStatus(statusList[1]);
                    }}
                >
                    <div style={{ whiteSpace: "nowrap" }}>
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
                    </div>
                </Box>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
            <Button variant="contained" onClick={clickPro}>긍정</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button variant="contained" onClick={clickCon}>부정</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button variant="contained" onClick={clickAnalysis}>분석결과</Button>
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
        </Grid>
    );
}

export default HomePage;
