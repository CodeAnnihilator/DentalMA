import React, {ReactNode} from 'react';

import styles from './table.module.scss';

interface ITable {
	head: string[];
	data: Array<Array<(string|number|ReactNode)>>;
	onRowClick: (id: number) => void;
}

const Table = ({
	head,
	data,
	onRowClick,
}: ITable) => (
	<div className={styles.wrapper}>
		<div className={styles.innerWrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						{
							head.map((cell, index) => (
								<th key={index}>{cell}</th>
							))
						}
					</tr>
				</thead>
				<tbody>
					{
						data.map((row: any, rowIndex: number) => (
							<tr key={rowIndex} onClick={() => onRowClick(row)}>
								{
									row.map((cell: (string | number), cellIndex: number) => (
										<td key={cellIndex}>{cell}</td>
									))
								}
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	</div>
);

export default Table;
