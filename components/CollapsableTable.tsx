import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';

export interface Row {
  data: Array<string | number>;
  innerTable: {
    columnsName: Array<string>;
    data: Array<string | number>;
  };
  actions: React.ReactNode;
}

interface CollapsableTableProps {
  columnsName: Array<string>;
  rows: Array<Row>;
}

const Row = ({ data, innerTable, actions }: Row) => {
  const [isRowOpen, setIsRowOpen] = useState(false);

  const onToggleRowOpenHandler = () => setIsRowOpen(!isRowOpen);

  const renderData = data.map((item, key) => (
    <TableCell key={`${key}-${item}`}>{item}</TableCell>
  ));

  const renderInnerTableHead = (
    <TableRow>
      {innerTable.columnsName.map((columnName, key) => (
        <TableCell key={`${key}-${columnName}`}>{columnName}</TableCell>
      ))}
    </TableRow>
  );

  const renderInnerTableData = (
    <TableRow>
      {innerTable.data.map((item, key) => (
        <TableCell key={`row-data-${key}`} width="auto">
          <Box sx={{ overflowWrap: 'break-word' }}>{item}</Box>
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={onToggleRowOpenHandler}
          >
            {isRowOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {renderData}
        {actions ? <TableCell>{actions}</TableCell> : null}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isRowOpen}>
            <Table
              size="small"
              aria-label="purchases"
              sx={{ tableLayout: 'fixed' }}
            >
              <TableHead>{renderInnerTableHead}</TableHead>
              <TableBody>{renderInnerTableData}</TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const CollapsableTable = ({ columnsName, rows }: CollapsableTableProps) => {
  const renderTableHead = (
    <TableRow>
      <TableCell />
      {columnsName.map((columnName) => (
        <TableCell key={columnName}>{columnName}</TableCell>
      ))}
      {rows.length > 0 && rows[0].actions ? <TableCell /> : null}
    </TableRow>
  );

  const renderRows = rows.map((row, key) => (
    <Row key={`row-${key}`} {...row} />
  ));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>{renderTableHead}</TableHead>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsableTable;
