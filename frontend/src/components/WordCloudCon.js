import React from 'react';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import styled from "styled-components";

const Tabletitle = styled.div`
	font-weight: bold;
	text-align: left;
`;

const data = [
  { text: '완다비전', value: 250},
  { text: '아이언맨', value: 180},
  { text: '토르', value: 380},
  { text: '헐크', value: 300},
  { text: '앤트맨', value: 280},
  { text: '로키', value: 250},
  { text: '팔콘', value: 330},
  { text: '원터솔져', value: 200},
  { text: '캡틴아메리카', value: 220},
  { text: '행크핌', value: 70},
  { text: '캡틴마블', value: 250},
  { text: '이터널즈', value: 150},
  { text: '피카츄', value: 170},
  { text: '라이츄', value: 270},
  { text: '파이리', value: 300},
  { text: '꼬부기', value: 150},
  { text: '버터플', value: 300},
  { text: '야도란', value: 110},
  { text: '완다비전', value: 250},
  { text: '아이언맨', value: 180},
  { text: '토르', value: 380},
  { text: '헐크', value: 300},
  { text: '앤트맨', value: 280},
  { text: '로키', value: 250},
  { text: '팔콘', value: 330},
  { text: '원터솔져', value: 200},
  { text: '캡틴아메리카', value: 220},
  { text: '행크핌', value: 70},
  { text: '캡틴마블', value: 250},
  { text: '이터널즈', value: 150},
  { text: '피카츄', value: 170},
  { text: '라이츄', value: 270},
  { text: '파이리', value: 300},
  { text: '꼬부기', value: 150},
  { text: '버터플', value: 300},
  { text: '야도란', value: 110},
  { text: '완다비전', value: 250},
  { text: '아이언맨', value: 180},
  { text: '토르', value: 380},
  { text: '헐크', value: 300},
  { text: '앤트맨', value: 280},
  { text: '로키', value: 250},
  { text: '팔콘', value: 330},
  { text: '원터솔져', value: 200},
  { text: '캡틴아메리카', value: 220},
  { text: '행크핌', value: 70},
  { text: '캡틴마블', value: 250},
  { text: '이터널즈', value: 150},
  { text: '피카츄', value: 170},
  { text: '라이츄', value: 270},
  { text: '파이리', value: 300},
  { text: '꼬부기', value: 150},
  { text: '버터플', value: 300},
  { text: '야도란', value: 110},
]


const conColor10 = ["#4D060E", "#7C020F", "#B30D21", "#C81D30","#4D060E", "#7C020F", "#B30D21", "#C81D30","#4D060E", "#7C020F"];
const schemeCategory10ScaleOrdinal = scaleOrdinal(conColor10);

const fontSize = (word) => word.value / 20;
const rotate = (word) => (word.value % 90) - 45;

function WordCloudCon(){
  const newData = data.map((item) => ({
    text: item.text,
    value: Math.random() * 1000
  }));
  return(
    <div style={{width: "100%", height: "100%", marginTop: "50px"}}>
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
    </div>)
}

export default WordCloudCon;