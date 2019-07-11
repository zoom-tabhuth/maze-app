import React from 'react';
import logo from './logo.svg';
import './App.css';


function coordinatesIntoCell(x, y, rows, columns) {
	return (x * rows) + y;
}

function cellIntoCoordinates(n, rows, columns) {
	return {
		'row': Math.floor(n/rows),
		'col': n%rows,
	}
}

function intializeVisitedMatrix(rows, columns) {
	var visited = [];

	for (var i = 0; i < rows; i++) {
		var row = [];
		for (var j = 0; j < columns; j++) {
			row.push(false);
		}

		visited.push(row);
	}

	return visited;
}

function intializeConnections(rows, columns) {
	var totalCells = rows * columns,
		connections = [];

	for (var i = 0; i < totalCells; i++) {
		connections.push([]);
	}

	return connections;
}

function withinBounds(x, y, rows, columns) {
	return 	(x >= 0 && x < rows)
			&&
			(y >= 0 && y < columns);
}

function selectRandomNeighbor(x, y) {
	var random = Math.pow( 	-1, 
								Math.floor(Math.random() * 100) 
							);
	switch(random) {
		case 1: 
			return {
				'row': 	x + Math.pow( 	-1, 
										Math.floor(Math.random() * 100) 
									),
				'col': 	y,
			}

		case -1: 
			return {				
				'row': 	x,
				'col': 	y + Math.pow( 	-1, 
										Math.floor(Math.random() * 100) 
									),				
			}
	}
}

function generateMaze() {
	var rows = 10, columns = 10,
		x = 0, y = 0,
		visited = intializeVisitedMatrix(rows, columns),
		connections = intializeConnections(rows, columns);

	console.log('connections: ', connections);

	for ( ;x !== rows-1 && y !== columns-1; ) {
		var row, col, from, to;

		do {		
			({row, col} = selectRandomNeighbor(x, y));
			
			for ( 	; !withinBounds(row, col, rows, columns); ) {
				({row, col} = selectRandomNeighbor(x, y));
			}

			from = coordinatesIntoCell(x, y, rows, columns);
			to = coordinatesIntoCell(row, col, rows, columns);
			
			console.log('from: ', from, 'to: ', to);
			console.log('connections[from]: ', connections[from]);
		} while(connections[from].includes(to));

		visited[x][y] = true;

		connections[from].push(to);
		({x, y} = cellIntoCoordinates(to, rows, columns) );
		console.log('end of generateMaze(), x = ', x, 'y = ', y);

	}

}


class Maze extends React.Component {
	render() {
		return ;
	}


}


function App() {
  return (
	<Maze />
  );
}

export default App;
