import React, { Component } from "react";
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
import DataTable from "./table";
import { useState } from "react";

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

function HomePage() {
    const [keyword, setKeyword] = useState("");

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

                        console.log(keyword);
                    }}
                >
                    <div style={{ whiteSpace: "nowrap" }}>
                        <SearchTextField
                            id="outlined-basic"
                            variant="outlined"
                            label="검색 키워드"
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
            <Grid item xs={8} align="center">
                <DataTable />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={12}></Grid>
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
