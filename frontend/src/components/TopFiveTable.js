import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(top, val) {
	return { top, val };
}

function TopFiveTable({ goodwords, badwords }) {
	const data = goodwords.concat(badwords);
	data.sort(function (a, b) {
		if (a[1] > b[1]) {
			return -1;
		}
		if (a[1] < b[1]) {
			return 1;
		}
		return 0;
	});
	let rowslist = [];
	data.forEach((element) => {
		if (rowslist.includes(element[0])) {
		} else {
			rowslist.push(element[0]);
		}
	});
	const rows = [
		createData(1, rowslist[0]),
		createData(2, rowslist[1]),
		createData(3, rowslist[2]),
		createData(4, rowslist[3]),
		createData(5, rowslist[4]),
	];

	return (
		<TableContainer component={Paper} style={{ width: "50%" }}>
			<Table sx={{ minWidth: 300 }} aria-label="simple table">
				<TableHead style={{ backgroundColor: "#e4e8ff" }}>
					<TableRow>
						<TableCell align="center">순위</TableCell>
						<TableCell align="center">키워드</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.top}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell
								align="center"
								component="th"
								scope="row"
							>
								{row.top}
							</TableCell>
							<TableCell align="center">{row.val}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default TopFiveTable;
