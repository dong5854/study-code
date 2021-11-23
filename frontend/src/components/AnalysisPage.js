import { Grid } from "@mui/material";
import React, { Component } from "react";
import ProconChart from "./PieChart";
import TopFiveTable from "./TopFiveTable";
import WordCloudPro from "./WordCloudPro";
import WordCloudCon from "./WordCloudCon";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Tabletitle = styled.div`
	margin-bottom: 15px;
	font-weight: bold;
	width: 50%;
	text-align: left;
`;

function AnalysisPage() {
	let searchEngine = new URLSearchParams(window.location.search).get(
		"engine"
	);
	if (searchEngine == "트위터") {
		return (
			<Grid container>
				<Grid item xs={6} style={{ marginBottom: "50px" }}>
					<Tabletitle>연관 키워드 top5</Tabletitle>
					<TopFiveTable></TopFiveTable>
				</Grid>
				<Grid item xs={6} style={{ marginBottom: "50px" }}>
					<ProconChart></ProconChart>
				</Grid>
				<Grid item xs={6} style={{ marginTop: "50px" }}>
					<Tabletitle>추천 수 top5</Tabletitle>
					<TopFiveTable></TopFiveTable>
				</Grid>
				<Grid item xs={3}>
				< WordCloudPro />
				</Grid>
				<Grid item xs={3}>
				< WordCloudCon />
				</Grid>
			</Grid>
		);
	} else {
		return (
			<Grid container>
				<Grid item xs={6} style={{ marginBottom: "50px" }}>
					<Tabletitle>연관 키워드 top5</Tabletitle>
					<TopFiveTable></TopFiveTable>
				</Grid>
				<Grid item xs={6} style={{ marginBottom: "50px" }}>
					<ProconChart></ProconChart>
				</Grid>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}></Grid>
			</Grid>
		);
	}
}

export default AnalysisPage;
