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

const rows = [
	createData(1, "맥북에어프로"),
	createData(2, "맥북12인치"),
	createData(3, "맥북15인치"),
	createData(4, "애플"),
	createData(5, "맥북프로"),
];

function TopFiveTable() {
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
