import React, { Component } from "react";
import DataTable from "./DataTable";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function ProConPage() {
	function HandleClick(e) {
		let targetId = e.target.closest(".MuiButton-outlined").id;
		if (targetId === "pro") {
			document.querySelector("#pro").style.background = "#7791DC";
			document.querySelector("#pro").style.color = "white";
			document.querySelector("#con").style.background = "";
			document.querySelector("#con").style.color = "";
		} else if (targetId === "con") {
			document.querySelector("#pro").style.background = "";
			document.querySelector("#pro").style.color = "";
			document.querySelector("#con").style.background = "#7791DC";
			document.querySelector("#con").style.color = "white";
		}
	}
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					"& > *": {
						m: 1,
					},
				}}
			>
				<ButtonGroup
					variant="outlined"
					aria-label="outlined button group"
				>
					<Button
						id="pro"
						style={{ background: "#7791DC", color: "white" }}
						onClick={HandleClick}
					>
						긍정
					</Button>
					<Button id="con" style={{}} onClick={HandleClick}>
						부정
					</Button>
				</ButtonGroup>
			</Box>
			<DataTable></DataTable>
		</>
	);
}

export default ProConPage;
