import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withStyles } from "@material-ui/core/styles";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link
				color="inherit"
				href="http://www.dongguk.edu/mbs/kr/index.jsp"
			>
				dongguk dash
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

const ContainerSignIn = withStyles({
	root: {
		// backgroundColor: "rgba(255, 255, 255, 30)",
		// backgroundSize: "cover",
		// backgroundRepeat: "no-repeat",
		// backgroundPosition: "center center",
		// backgrounSize: "100%",
		// borderRadius: "30px",
		// paddingLeft: "150px!important",
		// paddingRight: "150px!important",
	},
})(Container);

function SignInPage() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
		//데이터베이스에서 값을 비교한 후 리디렉션할 예정
		window.location.href = "/mainpage";
	};

	return (
		<ThemeProvider theme={theme}>
			<ContainerSignIn component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "rgba(255, 255, 255, 0.3)",
						borderRadius: "30px",
						paddingTop: "30px",
						paddingLeft: "45px",
						paddingRight: "45px",
						paddingBottom: "30px",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "#ffdb76f2" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						환영합니다
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="이메일"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="패스워드"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="로그인 상태 유지"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							로그인
						</Button>
						<Grid container>
							<Grid item xs>
								{/* <Link href="#" variant="body2">
                                    Forgot password?
                                </Link> */}
							</Grid>
							<Grid item>
								<RouterLink to="/signup">
									회원가입
								</RouterLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</ContainerSignIn>
		</ThemeProvider>
	);
}

export default SignInPage;
