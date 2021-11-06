import React, {Component} from "react";
import { render } from "react-dom";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup,FormControlLabel, FormLabel, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Box } from "@material-ui/core";

const BlackTextTypography = withStyles({
    root: {
        color: "#000000",
        paddingBottom: "10px"
    }
    })(Typography);

const SearchTextField = withStyles({
    root: {
        width: 1000
    }
    })(TextField);

const SearchIconButton = withStyles({
    root: {
        position: "relative",
        right: "50px"
    }
    })(IconButton);

function HomePage (){
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Box clone mt="3rem">
                    <BlackTextTypography component="h4" variant="h4">
                        대쉬
                    </BlackTextTypography>
                    </Box>
                        <form noValidate autoComplete="off">
                            <div style={{whiteSpace: "nowrap"}}>
                                <SearchTextField id="outlined-basic" variant="outlined" label="검색 키워드" />
                                <Box clone marginTop={0.5} marginRight={5}>
                                    <SearchIconButton type="submit" aria-label="search">
                                        <SearchIcon />
                                    </SearchIconButton>
                                </Box>
                            </div>
                        </form>
                </Grid>
            </Grid>
        )
}

export default HomePage;

// export default class HomePage extends Component{
//     constructor(props){
//         super(props);
//     }
    
//     render(){
//         return(
//             <Grid container spacing={1}>
//                 <Grid item xs={12} align="center">
//                     <Box clone mt="3rem">
//                     <Typography component="h4" variant="h4">
//                         대쉬
//                     </Typography>
//                     </Box>
//                         <form noValidate autoComplete="off">
//                             <Box clone width={1000}>
//                                 <TextField id="standard-basic" label="검색 키워드" />
//                             </Box>
//                             <Box clone marginTop={1.2}>
//                                         <IconButton type="submit" aria-label="search">
//                                     <SearchIcon />
//                                 </IconButton>
//                             </Box>
//                         </form>
//                 </Grid>
//             </Grid>
//         )
//     }
// }