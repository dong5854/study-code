import React, { Component, useState, useEffect } from "react";
import DataTable from "./DataTable";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function ProConPage() {
	const searchKeyword = new URLSearchParams(window.location.search).get(
		"keyword"
	);
	const searchEngine = new URLSearchParams(window.location.search).get(
		"engine"
	);
	const [data, setData] = useState();
	const [procon, setProcon] = useState("pro");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (sessionStorage.getItem(searchKeyword + searchEngine) === null) {
			// sessionStorage.clear();
		} else {
			const dataObj = JSON.parse(
				sessionStorage.getItem(searchKeyword + searchEngine)
			);
			console.log(dataObj);
			setData(dataObj);
			setLoading(false);
		}
	}, []);

	const requestOptions = {
		url: "/api/connect_crawl",
		method: "POST",
		header: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		data: {
			keyword: searchKeyword,
			engine: searchEngine,
		},
	};

	useEffect(() => {
		axios(requestOptions).then((response) => {
			console.log(response);
			const data = [];
			const temp = response.data;
			temp.forEach((element) => {
				let id = element.id;
				let title = element.title;
				let description = element.text;
				let like = element.like;
				let date = element.created_at;
				let url = element.url;
				let tempObj = {
					id: id,
					title: title,
					description: description,
					like: like,
					date: date,
					url: url,
				};
				data.push(tempObj);
			});
			setData(data);
			window.sessionStorage.setItem(
				searchKeyword + searchEngine,
				JSON.stringify(data)
			);
			setLoading(false);
		});
	}, []);

	function HandleClick(e) {
		let targetId = e.target.closest(".MuiButton-outlined").id;
		if (targetId === "pro") {
			document.querySelector("#pro").style.background = "#7791DC";
			document.querySelector("#pro").style.color = "white";
			document.querySelector("#con").style.background = "";
			document.querySelector("#con").style.color = "";
			setProcon["pro"];
		} else if (targetId === "con") {
			document.querySelector("#pro").style.background = "";
			document.querySelector("#pro").style.color = "";
			document.querySelector("#con").style.background = "#7791DC";
			document.querySelector("#con").style.color = "white";
			setProcon["con"];
		}
	}
	return (
		<>
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
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			) : (
				<DataTable data={data}></DataTable>
			)}
		</>
	);
}

export default ProConPage;
