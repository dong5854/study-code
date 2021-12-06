import React, { Component, useState, useEffect } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ResultPage() {
	const searchKeyword = new URLSearchParams(window.location.search).get(
		"keyword"
	);
	const searchEngine = new URLSearchParams(window.location.search).get(
		"engine"
	);
	const [data, setData] = useState("");
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

	return (
		<>
			{loading ? (
				<>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<CircularProgress />
					</Box>
					<div style={{ marginTop: "30px" }}>
						데이터를 수집중입니다..
					</div>
				</>
			) : (
				<DataTable data={data}></DataTable>
			)}
		</>
	);
}

export default ResultPage;
