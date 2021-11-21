import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "styled-components";

const PieChart = styled.div`
	width: 300px;
	height: 300px;
`;

function ProconChart() {
	const canvasDom = useRef(null);
	const data = {
		labels: ["긍정", "부정"],
		datasets: [
			{
				label: "긍부정 차트",
				data: [300, 50],
				backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
				hoverOffset: 4,
			},
		],
	};
	const options = {
		legend: {
			display: false,
		},
		plugins: {
			datalabels: {
				display: true,
				formatter: (val, ctx) => {
					return ctx.chart.data.labels[ctx.dataIndex];
				},
				color: "#fff",
				backgroundColor: "#404040",
			},
		},
	};
	const config = {
		type: "pie",
		data: data,
		options: options,
	};
	useEffect(() => {
		const ctx = canvasDom.current.getContext("2d");
		new Chart(ctx, config);
	}, []);

	return (
		<PieChart>
			<canvas ref={canvasDom}></canvas>
		</PieChart>
	);
}

export default ProconChart;
