import React, { Component, useState, useEffect } from "react";
import DataTable from "./DataTable";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const proconList = ["pro", "con"];
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
	} else {
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

	//useEffect(() => {
	//	proconTable(procon);
	//}, [procon]);

	function HandleClick(e) {
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
			{loading === false && (
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
							onClick={HandleClick}
						>
							긍정
						</Button>
						<Button
							id="con"
							style={{ fontFamily: "GodoB" }}
							onClick={HandleClick}
						>
							부정
						</Button>
					</ButtonGroup>
				</Box>
			)}
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			) : (
				proconTable(procon)
			)}
		</>
	);
}

export default ProConPage;
