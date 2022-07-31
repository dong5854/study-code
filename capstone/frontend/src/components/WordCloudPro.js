import React from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import styled from "styled-components";

const Tabletitle = styled.div`
	font-weight: bold;
	text-align: left;
`;

// const data = [
// 	{ text: "아이폰", value: 250 },
// 	{ text: "애플", value: 180 },
// 	{ text: "할인", value: 380 },
// 	{ text: "성능", value: 300 },
// 	{ text: "강력", value: 280 },
// 	{ text: "최대", value: 250 },
// 	{ text: "호환성", value: 330 },
// 	{ text: "업데이트", value: 200 },
// 	{ text: "코어", value: 220 },
// 	{ text: "최적화", value: 70 },
// 	{ text: "가능", value: 250 },
// 	{ text: "소비자", value: 150 },
// 	{ text: "디자인", value: 170 },
// 	{ text: "시장점유율", value: 270 },
// 	{ text: "신형", value: 300 },
// 	{ text: "탑재", value: 150 },
// 	{ text: "효율", value: 300 },
// 	{ text: "아이폰", value: 250 },
// 	{ text: "애플", value: 180 },
// 	{ text: "할인", value: 380 },
// 	{ text: "성능", value: 300 },
// 	{ text: "강력", value: 280 },
// 	{ text: "최대", value: 250 },
// 	{ text: "호환성", value: 330 },
// 	{ text: "업데이트", value: 200 },
// 	{ text: "코어", value: 220 },
// 	{ text: "최적화", value: 70 },
// 	{ text: "가능", value: 250 },
// 	{ text: "소비자", value: 150 },
// 	{ text: "디자인", value: 170 },
// 	{ text: "시장점유율", value: 270 },
// 	{ text: "신형", value: 300 },
// 	{ text: "탑재", value: 150 },
// 	{ text: "효율", value: 300 },
// ];

const proColor10 = [
	"#0E2F4E",
	"#123464",
	"#104476",
	"#2A557F",
	"#0E2F4E",
	"#123464",
	"#104476",
	"#2A557F",
	"#104476",
	"#2A557F",
];
const schemeCategory10ScaleOrdinal = scaleOrdinal(proColor10);

const fontSize = (word) => word.value / 20;
const rotate = (word) => (word.value % 90) - 45;

function WordCloudPro({ prodata }) {
	let data = [];
	prodata.forEach((element, i) => {
		data[i] = { text: element[0], value: element[1] };
	});
	const newData = data.map((item) => ({
		text: item.text,
		value: Math.random() * 1000,
	}));
	return (
		<div
			style={{
				width: "85%",
				height: "90%",
				marginTop: "50px",
				marginLeft: "auto",
			}}
		>
			<Tabletitle>긍정 키워드</Tabletitle>
			<WordCloud
				width={1000}
				height={750}
				data={newData}
				fontSize={fontSize}
				fontWeight="bold"
				rotate={rotate}
				padding={2}
				fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
			/>
		</div>
	);
}

export default WordCloudPro;
