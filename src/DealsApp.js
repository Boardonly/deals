import React from 'react';
import { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import init from './init.json'
import Row from './Row'

window.init = init

const getdeals = () => {
	return init
}

export default function DealsApp() {
	const deals = getdeals()
	const headCells = [
		{ id: 'clientName', numeric: false, label: 'Client name' },
		{ id: 'clientPhone', numeric: true, label: 'Phone number' },
		{ id: 'date', numeric: true, label: 'Date' },
		{ id: 'time', numeric: true, label: 'Time' },
		{ id: 'winchName', numeric: false, label: 'Winch' },
		{ id: 'winchPaid', numeric: false, label: 'WinchPaid' },
		{ id: 'teacherName', numeric: false, label: 'Teacher' },
		{ id: 'teacherPaid', numeric: false, label: 'TeacherPaid' },
		{ id: 'bookedAdmin', numeric: false, label: 'BookedAdmin' },
		{ id: 'clientId', numeric: true, label: 'ClientId' },
	];
	const [selected, setSelected] = useState([...deals.data])
	const [order, setOrder] = useState('dec')

	window.selected = selected


	let createSortHandler = (event, param) => {
		console.log(event, param)
		setOrder('dec')
		if (order === 'dec') {
			setSelected(selected.sort((a, b) => b[param] - a[param]))
		}

		setSelected(selected.sort((a, b) => a[param] - b[param]))
	}


	return (
		<div>
			<CollapsibleTable
				headCells={headCells}
				createSortHandler={createSortHandler}
				selected={selected}
			/>
		</div>
	)
}


function CollapsibleTable({ rows, headCells, createSortHandler, selected }) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />

						{headCells.map((headCell, i) => (

							<TableCell align="center" key={i}>
								<TableSortLabel
									active={true}
									direction={'dec'}

									onClick={(event) => createSortHandler(event, headCell.id)}
								>
									{headCell.label}

								</TableSortLabel>
							</TableCell>
						))
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{selected.map((row) => (
						<Row key={row.client["_id"]} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}