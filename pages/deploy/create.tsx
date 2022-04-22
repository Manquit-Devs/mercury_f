import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DeleteIcon from "@mui/icons-material/Delete";
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
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CollapsableTable from "../../components/CollapsableTable";
import LeftBar from "../../components/LeftBar";
import Main from "../../components/Main";
import NavBar from "../../components/NavBar";
import SimpleBackdrop from "../../components/SimpleBackdrop";
import Spinner from "../../components/Spinner";
import VerifyAuth from "../../components/VerifyAuth";
import { NavBarContext } from "../../contexts/navbar";
import { StepCommand, StepType } from "../../services/database";
import { createDeploy } from "../../services/deploy";
import { DeployStepJSON, getStepTypes } from "../../services/stepTypes";
import { errorAlert, successAlert } from "../../utils/alertUtils";

const CreateDeploy: NextPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workingDirectory, setWorkingDirectory] = useState("");
  const [branchName, setBranchName] = useState("");
  const [actualStepName, setActualStepName] = useState("");
  const [actualStepType, setActualStepType] = useState(1);
  const [actualStepOrder, setActualStepOrder] = useState(0);
  const [isStepTypesLoading, setIsStepTypesLoading] = useState(false);
  const [isCreatingDeploy, setIsCreatingDeploy] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [actualStepArgs, setActualStepArgs] = useState({} as StepCommand);
  const [steps, setSteps] = useState(Array<DeployStepJSON>());
  const [stepTypes, setStepTypes] = useState(Array<StepType>());
  const { isOpen } = useContext(NavBarContext);
  const router = useRouter();
  const stepsTableColumns = ["Nome", "Tipo"];

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
    setActualStepName("");
    setActualStepArgs({
      command: "",
    } as StepCommand);
  };

  const isFormFilled = (
    name: string,
    workingDirectory: string,
    branchName: string,
    steps: Array<DeployStepJSON>
  ) => {
    return Boolean(name && workingDirectory && branchName && steps.length > 0);
  };

  const sortStepByOrder = (step1: DeployStepJSON, step2: DeployStepJSON) =>
    Number(step1.order > step2.order);

  const getStepTypeById = (id: number) =>
    stepTypes.find((stepType) => stepType.id === id);

  const createRowActions = (rowOrder: number) => (
    <Box minWidth="155px">
      <IconButton onClick={() => moveStepUp(rowOrder)}>
        <ArrowDropUpIcon />
      </IconButton>
      <IconButton onClick={() => moveStepDown(rowOrder)}>
        <ArrowDropDownIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon onClick={() => removeStep(rowOrder)} />
      </IconButton>
    </Box>
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

  const submitFormHandler = async () => {
    try {
      setIsCreatingDeploy(true);
      await createDeploy({
        name,
        description,
        branch: branchName,
        workingDirectory,
        steps,
      });
      successAlert("Deploy criado");
      router.push("/deploy");
    } catch (error) {
      errorAlert("Não foi possivel criar o deploy");
      console.log(error);
    } finally {
      setIsCreatingDeploy(false);
    }
    console.log(name, description, workingDirectory, branchName, steps);
  };

  const renderStepTypeArgsFields = () => {
    switch (actualStepType) {
      case 1:
        return (
          <TextField
            label="Command"
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

  const stepsForm = (
    <>
      <TextField
        label="Name"
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
            <FormLabel component="legend">Type</FormLabel>
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
          <Button
            variant="contained"
            onClick={addStepHandler}
            disabled={!(actualStepName && actualStepArgs.command)}
          >
            Add Step
          </Button>
        </Box>
      )}
    </>
  );

  const stepsTable = (
    <Box mt="8px" height="100%">
      {steps.length > 0 ? (
        <CollapsableTable
          columnsName={stepsTableColumns}
          rows={createStepTableRows}
        />
      ) : (
        <Box display="flex" justifyContent="center">
          Add steps to the build
        </Box>
      )}
    </Box>
  );

  useEffect(() => {
    fetchStepTypes();
  }, []);

  useEffect(() => {
    const isFormValid = isFormFilled(name, branchName, workingDirectory, steps);
    setIsFormValid(isFormValid);
  }, [name, branchName, workingDirectory, steps]);

  return (
    <>
      <VerifyAuth />
      <Head>
        <title>Create deploy</title>
      </Head>
      <Box>
        <SimpleBackdrop open={isCreatingDeploy} />
        <NavBar />
        <Box display="flex">
          <LeftBar />
          <Main open={isOpen}>
            <Typography variant="h5" mb="20px">
              New Deploy
            </Typography>
            <form>
              <TextField
                label="Name"
                value={name}
                variant="filled"
                margin="dense"
                required
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                value={description}
                label="Description"
                variant="filled"
                margin="dense"
                maxRows={4}
                fullWidth
                multiline
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label="Working Directory Path"
                value={workingDirectory}
                required
                variant="filled"
                margin="dense"
                fullWidth
                onChange={(e) => setWorkingDirectory(e.target.value)}
              />
              <TextField
                label="Branch's Name"
                value={branchName}
                required
                variant="filled"
                margin="dense"
                fullWidth
                onChange={(e) => setBranchName(e.target.value)}
              />
              <Typography variant="h6">Build Steps</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={5}>
                  {stepsForm}
                </Grid>
                <Grid item xs={12} lg={7}>
                  {stepsTable}
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="center"
                width="100%"
                my="10px"
                mx="auto"
              >
                <Box width="100%" maxWidth="800px">
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!isFormValid}
                    onClick={submitFormHandler}
                  >
                    Create Deploy
                  </Button>
                </Box>
              </Box>
            </form>
          </Main>
        </Box>
      </Box>
    </>
  );
};

export default CreateDeploy;
