import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import type { NextPage } from 'next';
import {
  useContext,
  useEffect,
  useState,
  ReducerState,
  ReducerAction,
} from 'react';
import CollapsableTable from '../../components/CollapsableTable';
import LeftBar from '../../components/LeftBar';
import Main from '../../components/Main';
import NavBar from '../../components/NavBar';
import Spinner from '../../components/Spinner';
import { NavBarContext } from '../../context/navbar';
import { DeployStep, StepCommand, StepType } from '../../services/database';
import { getStepTypes, DeployStepJSON } from '../../services/stepTypes';
import { Row } from '../../components/CollapsableTable';

const CreateDeploy: NextPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workingDirectory, setWorkingDirectory] = useState('');
  const [actualStepName, setActualStepName] = useState('');
  const [actualStepType, setActualStepType] = useState(1);
  const [actualStepOrder, setActualStepOrder] = useState(0);
  const [actualStepArgs, setActualStepArgs] = useState({} as StepCommand);
  const [steps, setSteps] = useState(Array<DeployStepJSON>());
  const [stepTypes, setStepTypes] = useState(Array<StepType>());
  const [isStepTypesLoading, setIsStepTypesLoading] = useState(false);
  const { isOpen } = useContext(NavBarContext);

  const stepsTableColumns = ['ID', 'Nome', 'Tipo'];

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
    console.log(steps);
  };

  const sortStepByOrder = (step1: DeployStepJSON, step2: DeployStepJSON) =>
    Number(step1.order > step2.order);

  const getStepTypeById = (id: number) =>
    stepTypes.find((stepType) => stepType.id === id);

  const createStepTableRows = steps.sort(sortStepByOrder).map((step) => ({
    data: [
      step.order + 1,
      step.name,
      String(getStepTypeById(step.typeId)?.name),
    ],
    innerTable: {
      columnsName: [String(getStepTypeById(step.typeId)?.name)],
      data: [step.args.command],
    },
  }));

  const renderStepTypes = stepTypes.map((stepType) => (
    <FormControlLabel
      value={stepType.id}
      control={<Radio />}
      label={stepType.name}
      key={`rst-${stepType.id}`}
    ></FormControlLabel>
  ));

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

  const renderFormFields = (
    <>
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
      <Typography variant="h6">Passos da build</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
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
        </Grid>
        <Grid item xs={12} lg={7}>
          <Box mt="8px">
            <CollapsableTable
              columnsName={stepsTableColumns}
              rows={createStepTableRows}
            />
          </Box>
        </Grid>
      </Grid>
    </>
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
          <form>{renderFormFields}</form>
        </Main>
      </Box>
    </Box>
  );
};

export default CreateDeploy;
