import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import HandymanIcon from "@mui/icons-material/Handyman";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import { useMemo } from "react";
import { DeployBuildJSON, DeployGetBody } from "../services/deploy";

interface DeployTableProps {
  deploys: Array<DeployGetBody>;
}

const DeployTable = ({ deploys }: DeployTableProps) => {
  const headers = ["Status", "Nome", "Última Build", "Ações"];

  const makeRowStatus = (rowBuilds: Array<DeployBuildJSON>) => {
    const rowBuild = rowBuilds[0];
    let buildIcon = <></>;

    if (!rowBuild) {
      buildIcon = <WatchLaterIcon />;
    } else {
      switch (rowBuild.statusId) {
        case 1:
          buildIcon = <WatchLaterIcon />;
          break;
        case 2:
          buildIcon = <HourglassTopIcon />;
        case 3:
          buildIcon = <DoneIcon />;
          break;
        case 4:
          buildIcon = <ErrorIcon />;
          break;
        default:
          buildIcon = <ErrorIcon />;
          break;
      }
    }
    return (
      <Tooltip title={(rowBuild && rowBuild.name) || "PENDING"}>
        {buildIcon}
      </Tooltip>
    );
  };

  const makeRowBuild = (rowBuilds: Array<DeployBuildJSON>) => {
    const rowBuild = rowBuilds[0];
    if (!rowBuild) return <span>Sem builds</span>;
    return (
      <Box>
        <Box component="span" mr="5px">
          {rowBuild.sender}
        </Box>
        <Box component="span" bgcolor="#2b5eff" borderRadius="2px" p="4px">
          #{rowBuild.commit}
        </Box>
        <Box mt="4px">
          <b>{moment(rowBuild.date).format("MMM DD, YYYY [at] hh:mm")}</b>
        </Box>
      </Box>
    );
  };

  const makeRowActions = () => (
    <Box>
      <Tooltip title="Configurar">
        <IconButton>
          <DisplaySettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Agendar Build">
        <IconButton>
          <AlarmAddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Executar Build">
        <IconButton>
          <HandymanIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const makeTableRow = (row: DeployGetBody, key: string) => (
    <TableRow key={key}>
      <TableCell align="center">{makeRowStatus(row.builds)}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{makeRowBuild(row.builds)}</TableCell>
      <TableCell align="center">{makeRowActions()}</TableCell>
    </TableRow>
  );

  const tableHeader = (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <TableCell align="center" key={`dth-${index}`}>
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const tableBody = useMemo(
    () => (
      <TableBody>
        {deploys.map((deploy) => makeTableRow(deploy, `dtbr-${deploy.id}`))}
      </TableBody>
    ),
    [deploys]
  );

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }}>
        {tableHeader}
        {tableBody}
      </Table>
    </TableContainer>
  );
};

export default DeployTable;
