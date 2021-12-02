import React from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import styled from "styled-components";

const Tabletitle = styled.div`
	font-weight: bold;
	text-align: left;
`;

const data = [
	{ text: "삼성", value: 250 },
	{ text: "원가", value: 180 },
	{ text: "배터리", value: 380 },
	{ text: "이상", value: 300 },
	{ text: "어떻", value: 280 },
	{ text: "랜섬웨어", value: 250 },
	{ text: "수리", value: 330 },
	{ text: "업체", value: 200 },
	{ text: "셀프", value: 220 },
	{ text: "혐의", value: 70 },
	{ text: "순정", value: 250 },
	{ text: "부품", value: 150 },
	{ text: "센터", value: 170 },
	{ text: "사설", value: 270 },
	{ text: "호환성", value: 300 },
	{ text: "시장", value: 150 },
	{ text: "기대", value: 300 },
	{ text: "원가", value: 180 },
	{ text: "배터리", value: 380 },
	{ text: "이상", value: 300 },
	{ text: "어떻", value: 280 },
	{ text: "랜섬웨어", value: 250 },
	{ text: "수리", value: 330 },
	{ text: "업체", value: 200 },
	{ text: "셀프", value: 220 },
	{ text: "혐의", value: 70 },
	{ text: "순정", value: 250 },
	{ text: "부품", value: 150 },
	{ text: "센터", value: 170 },
	{ text: "사설", value: 270 },
	{ text: "호환성", value: 300 },
	{ text: "시장", value: 150 },
	{ text: "기대", value: 300 },
	{ text: "원가", value: 180 },
	{ text: "배터리", value: 380 },
	{ text: "이상", value: 300 },
	{ text: "어떻", value: 280 },
	{ text: "랜섬웨어", value: 250 },
	{ text: "수리", value: 330 },
	{ text: "업체", value: 200 },
	{ text: "셀프", value: 220 },
	{ text: "혐의", value: 70 },
	{ text: "순정", value: 250 },
	{ text: "부품", value: 150 },
	{ text: "센터", value: 170 },
	{ text: "사설", value: 270 },
	{ text: "호환성", value: 300 },
	{ text: "시장", value: 150 },
	{ text: "기대", value: 300 },
];

const conColor10 = [
	"#4D060E",
	"#7C020F",
	"#B30D21",
	"#C81D30",
	"#4D060E",
	"#7C020F",
	"#B30D21",
	"#C81D30",
	"#4D060E",
	"#7C020F",
];
const schemeCategory10ScaleOrdinal = scaleOrdinal(conColor10);

const fontSize = (word) => word.value / 20;
const rotate = (word) => (word.value % 90) - 45;

function WordCloudCon({ condata }) {
	let data = [];
	condata.forEach((element, i) => {
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
			<Tabletitle>부정 키워드</Tabletitle>
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

export default WordCloudCon;
