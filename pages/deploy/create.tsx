import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import CollapsableTable from '../../components/CollapsableTable';
import LeftBar from '../../components/LeftBar';
import Main from '../../components/Main';
import NavBar from '../../components/NavBar';
import Spinner from '../../components/Spinner';
import { NavBarContext } from '../../context/navbar';
import { StepCommand, StepType } from '../../services/database';
import { DeployStepJSON, getStepTypes } from '../../services/stepTypes';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateDeploy: NextPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workingDirectory, setWorkingDirectory] = useState('');
  const [branchName, setBranchName] = useState('');
  const [actualStepName, setActualStepName] = useState('');
  const [actualStepType, setActualStepType] = useState(1);
  const [actualStepOrder, setActualStepOrder] = useState(0);
  const [actualStepArgs, setActualStepArgs] = useState({} as StepCommand);
  const [steps, setSteps] = useState(Array<DeployStepJSON>());
  const [stepTypes, setStepTypes] = useState(Array<StepType>());
  const [isStepTypesLoading, setIsStepTypesLoading] = useState(false);
  const { isOpen } = useContext(NavBarContext);

  const stepsTableColumns = ['Nome', 'Tipo'];

  const fetchStepTypes = async () => {
    try {
      setIsStepTypesLoading(true);
      const stepTypes = await getStepTypes();
      setStepTypes(stepTypes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsStepTypesLoading(false);
    }
  };

  const moveStepUp = (order: number) => {
    const stepIndex = steps.findIndex((step) => step.order === order);
    if (stepIndex === 0) return;
    steps[stepIndex].order = order - 1;
    steps[stepIndex - 1].order = order;
    setSteps([...steps]);
  };

  const moveStepDown = (order: number) => {
    const stepIndex = steps.findIndex((step) => step.order === order);
    if (stepIndex === steps.length - 1) return;
    steps[stepIndex].order = order + 1;
    steps[stepIndex + 1].order = order;
    setSteps([...steps]);
  };

  const removeStep = (order: number) => {
    const newSteps = steps.filter((step) => step.order !== order);
    setSteps(newSteps);
  };

  const clearStepFormFields = () => {
    setActualStepName('');
    setActualStepArgs({
      command: '',
    } as StepCommand);
  };

  const sortStepByOrder = (step1: DeployStepJSON, step2: DeployStepJSON) =>
    Number(step1.order > step2.order);

  const getStepTypeById = (id: number) =>
    stepTypes.find((stepType) => stepType.id === id);

  const createRowActions = (rowOrder: number) => (
    <>
      <IconButton onClick={() => moveStepUp(rowOrder)}>
        <ArrowDropUpIcon />
      </IconButton>
      <IconButton onClick={() => moveStepDown(rowOrder)}>
        <ArrowDropDownIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon onClick={() => removeStep(rowOrder)} />
      </IconButton>
    </>
  );

  const createStepTableRows = steps.sort(sortStepByOrder).map((step) => ({
    data: [step.name, String(getStepTypeById(step.typeId)?.name)],
    innerTable: {
      columnsName: [String(getStepTypeById(step.typeId)?.name)],
      data: [step.args.command],
    },
    actions: createRowActions(step.order),
  }));

  const renderStepTypes = stepTypes.map((stepType) => (
    <FormControlLabel
      value={stepType.id}
      control={<Radio />}
      label={stepType.name}
      key={`rst-${stepType.id}`}
    ></FormControlLabel>
  ));

  const addStepHandler = () => {
    setSteps([
      ...steps,
      {
        name: actualStepName,
        order: actualStepOrder,
        typeId: actualStepType,
        args: actualStepArgs,
      } as DeployStepJSON,
    ]);
    setActualStepOrder(actualStepOrder + 1);
    clearStepFormFields();
  };

  const renderStepTypeArgsFields = () => {
    switch (actualStepType) {
      case 1:
        return (
          <TextField
            label="Comando"
            variant="filled"
            margin="dense"
            value={actualStepArgs.command}
            rows={4}
            fullWidth
            multiline
            required
            onChange={(e) =>
              setActualStepArgs({
                ...actualStepArgs,
                command: e.target.value,
              })
            }
          />
        );
      default:
        return null;
    }
  };

  const renderStepsForm = (
    <>
      <TextField
        label="Nome"
        value={actualStepName}
        variant="filled"
        margin="dense"
        required
        fullWidth
        onChange={(e) => setActualStepName(e.target.value)}
      />
      {isStepTypesLoading ? (
        <Spinner />
      ) : (
        <Box width="100%">
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo</FormLabel>
            <RadioGroup
              aria-label="Tipo"
              defaultValue="1"
              value={actualStepType}
              name="radio-buttons-group"
              onChange={(e) => setActualStepType(parseInt(e.target.value))}
            >
              {renderStepTypes}
            </RadioGroup>
          </FormControl>
          <Box>{renderStepTypeArgsFields()}</Box>
          <Button variant="contained" onClick={addStepHandler}>
            Adicionar passo
          </Button>
        </Box>
      )}
    </>
  );

  const renderStepsTable = (
    <Box mt="8px" height="100%">
      {steps.length > 0 ? (
        <CollapsableTable
          columnsName={stepsTableColumns}
          rows={createStepTableRows}
        />
      ) : (
        <Box display="flex" justifyContent="center">
          Adicione passos a build
        </Box>
      )}
    </Box>
  );

  useEffect(() => {
    fetchStepTypes();
  }, []);

  return (
    <Box>
      <NavBar />
      <Box display="flex">
        <LeftBar />
        <Main open={isOpen}>
          <Typography variant="h5" mb="20px">
            Novo deploy
          </Typography>
          <form>
            <TextField
              label="Nome"
              value={name}
              variant="filled"
              margin="dense"
              required
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={description}
              label="Descrição"
              variant="filled"
              margin="dense"
              fullWidth
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Diretório de trabalho"
              value={workingDirectory}
              required
              variant="filled"
              margin="dense"
              fullWidth
              onChange={(e) => setWorkingDirectory(e.target.value)}
            />
            <TextField
              label="Nome da branch"
              value={branchName}
              required
              variant="filled"
              margin="dense"
              fullWidth
              onChange={(e) => setBranchName(e.target.value)}
            />
            <Typography variant="h6">Passos da build</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={5}>
                {renderStepsForm}
              </Grid>
              <Grid item xs={12} lg={7}>
                {renderStepsTable}
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              my="20px"
              mx="auto"
            >
              <Box width="100%" maxWidth="700px">
                <Button variant="contained" fullWidth>
                  Criar deploy
                </Button>
              </Box>
            </Box>
          </form>
        </Main>
      </Box>
    </Box>
  );
};

export default CreateDeploy;
