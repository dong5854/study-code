import React, { Component, useState, useEffect } from "react";
import DataTable from "./DataTable";
import { Grid, Typography, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const proconList = ["pro", "con"];

const Container = withStyles({
	root: {
		backgroundColor: "#F5FAFD",
		//backgroundSize: "cover",
		//backgroundRepeat: "no-repeat",
		//backgroundPosition: "center center",
		//backgrounSize: "100%",
	},
})(Grid);

const searchKeyword = new URLSearchParams(window.location.search).get(
	"keyword"
);
const searchEngine = new URLSearchParams(window.location.search).get("engine");

function proconTable(procon) {
	if (procon == proconList[0]) {
		return (
			<DataTable
				data={JSON.parse(
					window.sessionStorage.getItem(
						searchKeyword + searchEngine + "pro_list"
					)
				)}
			></DataTable>
		);
	} else if (procon == proconList[1]) {
		return (
			<DataTable
				data={JSON.parse(
					window.sessionStorage.getItem(
						searchKeyword + searchEngine + "con_list"
					)
				)}
			></DataTable>
		);
	}
}

function ProConPage() {
	const [procon, setProcon] = useState(proconList[0]);
	const [loading, setLoading] = useState(true);

	const dataObj = JSON.parse(
		sessionStorage.getItem(searchKeyword + searchEngine)
	);

	const requestOptions = {
		url: "/api/procon",
		method: "POST",
		header: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		data: {
			data: dataObj,
		},
	};

	useEffect(() => {
		axios(requestOptions).then((response) => {
			console.log(response);
			window.sessionStorage.setItem(
				searchKeyword + searchEngine + "pro_list",
				JSON.stringify(response.data.pro_list)
			);
			window.sessionStorage.setItem(
				searchKeyword + searchEngine + "con_list",
				JSON.stringify(response.data.con_list)
			);
			setLoading(false);
		});
	}, []);

	function clickBtnHandler(e) {
		let targetId = e.target.closest(".MuiButton-outlined").id;
		if (targetId === "pro") {
			document.querySelector("#pro").style.background = "#7791DC";
			document.querySelector("#pro").style.color = "white";
			document.querySelector("#con").style.background = "";
			document.querySelector("#con").style.color = "";
			setProcon(proconList[0]);
		} else if (targetId === "con") {
			document.querySelector("#pro").style.background = "";
			document.querySelector("#pro").style.color = "";
			document.querySelector("#con").style.background = "#7791DC";
			document.querySelector("#con").style.color = "white";
			setProcon(proconList[1]);
		}
	}

	return (
		<>
			{loading ? (
				<>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<CircularProgress />
					</Box>
					<div style={{ marginTop: "30px" }}>
						데이터를 분석중입니다..
					</div>
				</>
			) : (
				<Container
					container
					spacing={1}
					style={{ overflowY: "scroll" }}
				>
					<Grid item xs={12} align="center">
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								"& > *": {
									m: 1,
								},
							}}
						>
							<ButtonGroup
								variant="outlined"
								aria-label="outlined button group"
							>
								<Button
									id="pro"
									style={{
										background: "#7791DC",
										color: "white",
										fontFamily: "GodoB",
									}}
									onClick={clickBtnHandler}
								>
									긍정
								</Button>
								<Button
									id="con"
									style={{ fontFamily: "GodoB" }}
									onClick={clickBtnHandler}
								>
									부정
								</Button>
							</ButtonGroup>
						</Box>
						{proconTable(procon)}
					</Grid>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}></Grid>
				</Container>
			)}
		</>
	);
}

export default ProConPage;
