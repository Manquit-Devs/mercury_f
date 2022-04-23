import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import HandymanIcon from '@mui/icons-material/Handyman';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
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
} from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';
import { API_URL } from '../services';
import {
  deleteDeployById,
  DeployBuildJSON,
  DeployGetBody,
  runDeployBuildById,
} from '../services/deploy';
import { confirmAlert, errorAlert, successAlert } from '../utils/alertUtils';

interface DeployTableProps {
  deploys: Array<DeployGetBody>;
  reloadTable: () => {};
}

const DeployTable = ({ deploys, reloadTable }: DeployTableProps) => {
  const headers = ['Name', 'Last Build', 'URL', 'Actions'];

  const runDeployBuild = async (deployId: number) => {
    try {
      const confirm = await confirmAlert(
        'Are you sure that do you want to run build for this deploy?'
      );
      if (confirm.isConfirmed){
        await runDeployBuildById(deployId);
        reloadTable();
        await successAlert('Deploy build put on queue to be executed');
      }
    } catch (error) {
      await errorAlert('Failed to run deploy build');
    }
  }

  const deleteDeploy = async (deployId: number) => {
    try {
      const confirm = await confirmAlert(
        'Are you sure that do you want to delete this deploy?'
      );
      if (confirm.isConfirmed) {
        await deleteDeployById(deployId);
        reloadTable();
        await successAlert('Deploy deleted');
      }
    } catch (error) {
      await errorAlert('Failed to delete deploy');
    }
  };

  const makeRowLastBuildStatus = (rowBuild: DeployBuildJSON) => {
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
          break;
        case 3:
          buildIcon = <DoneIcon color="success" />;
          break;
        case 4:
          buildIcon = <ErrorIcon color="error" />;
          break;
        default:
          buildIcon = <ErrorIcon color="error" />;
          break;
      }
    }
    return (
      <Tooltip title={(rowBuild && rowBuild.name) || 'PENDING'}>
        {buildIcon}
      </Tooltip>
    );
  };

  const makeRowLastBuild = (rowBuilds: Array<DeployBuildJSON>) => {
    const rowBuild = rowBuilds[rowBuilds.length - 1];
    if (!rowBuild) return <span>-</span>;
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Box component="span" mr="5px">
            {rowBuild.sender}
          </Box>
          <Box component="span" bgcolor="#2b5eff" borderRadius="2px" p="4px">
            #{rowBuild.commit}
          </Box>
        </Box>

        <Box mt="10px" display="flex" alignItems="center">
          <Box mr="10px">
            <b>{moment(rowBuild.date).format('MMM DD, YYYY [at] hh:mm')}</b>
          </Box>
          {makeRowLastBuildStatus(rowBuild)}
        </Box>
      </Box>
    );
  };

  const makeRowActions = (deployId: number) => (
    <Box>
      <Tooltip title="Settings">
        <IconButton disabled>
          <DisplaySettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Schedule Build">
        <IconButton disabled>
          <AlarmAddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Run Build">
        <IconButton onClick={() => runDeployBuild(deployId)}>
          <HandymanIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete deploy">
        <IconButton onClick={() => deleteDeploy(deployId)}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const makeRowUrl = (deployId: number, deploySecret: string) => `${API_URL}/api/deploy/build/run/github-webhook/${deployId}/${deploySecret}`;

  const makeTableRow = (row: DeployGetBody, key: string) => (
    <TableRow key={key}>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{makeRowLastBuild(row.builds)}</TableCell>
      <TableCell align="center">{makeRowUrl(row.id, row.secret)}</TableCell>
      <TableCell align="center">{makeRowActions(row.id)}</TableCell>
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
