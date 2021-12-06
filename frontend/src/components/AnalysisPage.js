import { Grid } from "@mui/material";
import React, { Component, useState, useEffect } from "react";
import ProconChart from "./PieChart";
import TopFiveTable from "./TopFiveTable";
import WordCloudPro from "./WordCloudPro";
import WordCloudCon from "./WordCloudCon";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Tabletitle = styled.div`
	margin-bottom: 15px;
	font-weight: bold;
	width: 50%;
	text-align: left;
`;

function AnalysisPage() {
	const [loading, setLoading] = useState(true);
	const [goodwords, setGoodwords] = useState("");
	const [badwords, setBadwords] = useState("");
	const searchKeyword = new URLSearchParams(window.location.search).get(
		"keyword"
	);
	const searchEngine = new URLSearchParams(window.location.search).get(
		"engine"
	);

	const dataObj = JSON.parse(
		sessionStorage.getItem(searchKeyword + searchEngine)
	);

	console.log(dataObj);

	const requestOptions = {
		url: "/api/analysis",
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
			setGoodwords(response.data.good_word_list);
			setBadwords(response.data.bad_word_list);
			window.sessionStorage.setItem(
				searchKeyword + searchEngine + "good_cnt",
				response.data.good_cnt
			);
			window.sessionStorage.setItem(
				searchKeyword + searchEngine + "bad_cnt",
				response.data.bad_cnt
			);
			window.sessionStorage.setItem(
				searchKeyword + searchEngine + "good_word",
				JSON.stringify(goodwords)
			);
			window.sessionStorage.setItem(
				searchKeyword + searchEngine + "bad_word",
				JSON.stringify(badwords)
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
						데이터를 분석중입니다..
					</div>
				</>
			) : (
				<Grid
					container
					style={{ marginTop: "2rem", alignItems: "center" }}
				>
					<Grid item xs={6} style={{ marginBottom: "50px" }}>
						<Tabletitle>연관 키워드 top5</Tabletitle>
						<TopFiveTable
							goodwords={goodwords}
							badwords={badwords}
						></TopFiveTable>
					</Grid>
					<Grid item xs={6} style={{ marginBottom: "50px" }}>
						<ProconChart></ProconChart>
					</Grid>
					{/* <Grid item xs={6}>
		<Tabletitle>추천 수 top5</Tabletitle>
		<TopFiveTable></TopFiveTable>
	</Grid> */}
					<Grid item xs={6}>
						<WordCloudPro prodata={goodwords} />
					</Grid>
					<Grid item xs={6}>
						<WordCloudCon condata={badwords} />
					</Grid>
				</Grid>
			)}
		</>
	);
}

export default AnalysisPage;
