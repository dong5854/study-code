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
import axios from "axios";

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

const theme = createTheme({
	typography: {
		fontFamily: "GodoB",
	},
	overrides: {
		MuiTypography: {
			root: {
				fontFamily: "GodoB",
			},
			body2: {
				fontFamily: "GodoB",
			},
		},
	},
});

function SignUpPage() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email =  data.get("email");
		const password =  data.get("password");
		const firstName =  data.get("firstName");
		const lastName =  data.get("lastName");
		// eslint-disable-next-line no-console
		console.log({
			email: data.get("email"),
			password: data.get("password"),
			firstName: data.get("firstName"),
			lastName: data.get("lastName"),
		});
		const requestOptions = {
			url: "/api/create_user",
			method: "POST",
			header: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			data: {
				email: email,
				password: password,
				name_first: firstName,
				name_last: lastName,
			},
		};
		axios(requestOptions).then((response) => {
			console.log(response);
			if(response.data.success == true){
				alert("회원가입 성공")
				window.location.href = "/";
			} else{
				alert("이미 존재하는 ID입니다")
			}
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
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
						회원가입
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="off"
									// autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="이름"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="성"
									name="lastName"
									autoComplete="off"
									// autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="이메일"
									name="email"
									autoComplete="off"
									// autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="비밀번호"
									type="password"
									id="password"
									autoComplete="off"
									// autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							회원가입
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<RouterLink to="/signin">로그인</RouterLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}

export default SignUpPage;
