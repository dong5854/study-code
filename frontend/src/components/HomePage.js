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
import { Box } from "@material-ui/core";
import DataTable from "./table";

const BlackTextTypography = withStyles({
    root: {
        color: "#000000",
        paddingBottom: "10px",
    },
})(Typography);

const SearchTextField = withStyles({
    root: {
        width: 1000,
    },
})(TextField);

const SearchIconButton = withStyles({
    root: {
        position: "relative",
        right: "50px",
    },
})(IconButton);

function HomePage() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Box clone mt="3rem">
                    <BlackTextTypography component="h4" variant="h4">
                        대쉬
                    </BlackTextTypography>
                </Box>
                <form noValidate autoComplete="off">
                    <div style={{ whiteSpace: "nowrap" }}>
                        <SearchTextField
                            id="outlined-basic"
                            variant="outlined"
                            label="검색 키워드"
                            InputProps={{ style: { paddingRight: "40px" } }}
                        />
                        <Box clone marginTop={0.5} marginRight={5}>
                            <SearchIconButton type="submit" aria-label="search">
                                <SearchIcon />
                            </SearchIconButton>
                        </Box>
                    </div>
                </form>
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
