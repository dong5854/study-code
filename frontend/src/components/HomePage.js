import React, {Component} from "react";
import { render } from "react-dom";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup,FormControlLabel, FormLabel, makeStyles } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Box } from "@material-ui/core";

export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Box clone mt="3rem">
                    <Typography component="h4" variant="h4">
                        대쉬
                    </Typography>
                    </Box>
                        <form noValidate autoComplete="off">
                            <Box clone width={1000}>
                                <TextField id="standard-basic" label="검색 키워드" />
                            </Box>
                            <Box clone marginTop={1.2}>
                                        <IconButton type="submit" aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </form>
                </Grid>
            </Grid>
        )
    }
}