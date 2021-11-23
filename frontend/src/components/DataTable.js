import React, { Component } from "react";
import { DataGrid } from "@mui/x-data-grid";
// https://v4.mui.com/components/tables/
const columns = [
	{ field: "title", headerName: "링크타이틀", width: 200 },
	{ field: "type", headerName: "웹페이지종류", width: 200 },
	{ field: "description", headerName: "내용요약", width: 500 },
	{ field: "like", headerName: "추천수", width: 120 },
	{ field: "date", headerName: "게시날짜", width: 200 },
	{ field: "url", headerName: "URL", width: 250 },
];

const rows = [
	{
		id: 1,
		title: "네이버",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 2,
		title: "다음",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 3,
		title: "카카오",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 4,
		title: "구글",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 5,
		title: "쿠팡",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 6,
		title: "11번가",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 7,
		title: "배달의 민족",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 8,
		title: "요기요",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
	{
		id: 9,
		title: "아마존",
		type: "이런저런종류",
		description:
			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
		like: 100,
		date: "2021/12/25",
		url: "www.example.com",
	},
];

export default function DataTable() {
	return (
		<div style={{ height: 400, width: "95%", backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	);
}
