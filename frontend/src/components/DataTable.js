import React, { Component, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

// https://v4.mui.com/components/tables/

const theme = createTheme({
	typography: {
		fontFamily: "GodoB",
	},
	overrides: {
		MuiTypography: {
			root: {
				fontFamily: "GodoB",
			},
			body2: {
				fontFamily: "GodoB",
			},
		},
		MuiDataGrid: {
			cell: {
				overflow: "overlay",
			},
		},
	},
});

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			alignItems: "center",
			lineHeight: "24px",
			width: "100%",
			height: "100%",
			position: "relative",
			display: "flex",
			"& .cellValue": {
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			},
		},
	})
);

function isOverflown(element) {
	return (
		element.scrollHeight > element.clientHeight ||
		element.scrollWidth > element.clientWidth
	);
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
	const { width, value } = props;
	const wrapper = React.useRef(null);
	const cellDiv = React.useRef(null);
	const cellValue = React.useRef(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();
	const [showFullCell, setShowFullCell] = React.useState(false);
	const [showPopper, setShowPopper] = React.useState(false);

	const handleMouseEnter = () => {
		const isCurrentlyOverflown = isOverflown(cellValue.current);
		setShowPopper(isCurrentlyOverflown);
		setAnchorEl(cellDiv.current);
		setShowFullCell(true);
	};

	const handleMouseLeave = () => {
		setShowFullCell(false);
	};

	React.useEffect(() => {
		if (!showFullCell) {
			return undefined;
		}

		function handleKeyDown(nativeEvent) {
			// IE11, Edge (prior to using Bink?) use 'Esc'
			if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
				setShowFullCell(false);
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [setShowFullCell, showFullCell]);

	return (
		<div
			ref={wrapper}
			className={classes.root}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				ref={cellDiv}
				style={{
					height: 1,
					width,
					display: "block",
					position: "absolute",
					top: 0,
				}}
			/>
			<div ref={cellValue} className="cellValue">
				{value}
			</div>
			{showPopper && (
				<Popper
					open={showFullCell && anchorEl !== null}
					anchorEl={anchorEl}
					style={{ width, marginLeft: -17 }}
				>
					<Paper
						elevation={1}
						style={{
							minHeight: wrapper.current.offsetHeight - 3,
							backgroundColor: "#F5FAFD",
							overflow: "auto",
						}}
						onClick={cellClickCtl}
					>
						<Typography variant="body2" style={{ padding: 8 }}>
							{value}
						</Typography>
					</Paper>
				</Popper>
			)}
		</div>
	);
});

GridCellExpand.propTypes = {
	value: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
	return (
		<GridCellExpand
			value={params.value || ""}
			width={params.colDef.computedWidth}
		/>
	);
}

renderCellExpand.propTypes = {
	/**
	 * The column of the row that the current cell belongs to.
	 */
	colDef: PropTypes.object.isRequired,
	/**
	 * The cell value, but if the column has valueGetter, use getValue.
	 */
	value: PropTypes.string.isRequired,
};

const columns = [
	{
		field: "title",
		headerName: "링크타이틀",
		width: 450,
		renderCell: renderCellExpand,
	},
	{
		field: "description",
		headerName: "내용요약",
		width: 800,
		renderCell: renderCellExpand,
	},
	{
		field: "like",
		headerName: "추천수",
		width: 120,
		renderCell: renderCellExpand,
	},
	{
		field: "date",
		headerName: "게시날짜",
		width: 200,
		renderCell: renderCellExpand,
	},
	{
		field: "url",
		headerName: "URL",
		width: 500,
		renderCell: renderCellExpand,
	},
];

const cellClickCtl = (e) => {
	// console.log(e.target);
};

export default function DataTable({ data }) {
	const rows = data;

	return (
		<div
			style={{
				height: 630,
				width: "95%",
				backgroundColor: "#F5FAFD",
			}}
		>
			<ThemeProvider theme={theme}>
				<DataGrid
					style={{ fontFamily: "GodoB" }}
					pagination
					componentsProps={{
						pagination: {
							SelectProps: {
								MenuProps: {
									sx: {
										fontFamily: "GodoB",
										"& .MuiMenuItem-root": {
											fontFamily: "GodoB",
										},
									},
								},
							},
						},
					}}
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					checkboxSelection
					onCellClick={cellClickCtl}
				/>
			</ThemeProvider>
		</div>
	);
}

// const rows = [
// 	{
// 		id: 1,
// 		title: "네이버",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 2,
// 		title: "다음",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 3,
// 		title: "카카오",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 4,
// 		title: "구글",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 5,
// 		title: "쿠팡",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 6,
// 		title: "11번가",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 7,
// 		title: "배달의 민족",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 8,
// 		title: "요기요",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 9,
// 		title: "아마존",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 10,
// 		title: "아마존",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// 	{
// 		id: 11,
// 		title: "아마존",
// 		description:
// 			"내용요약의 길이는 대충 이정도면 적당하지 않을까 싶은데 이거보다 길수도 있으니까 조금 더 추가",
// 		like: 100,
// 		date: "2021/12/25",
// 		url: "www.example.com",
// 	},
// ];
