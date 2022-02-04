import { DeployStep, StepCommand, StepType } from './database';
import api from './index';

export type DeployStepJSON = DeployStep & {
  args: StepCommand
}

export const getStepTypes = async () => {
  const res = await api.get('/deploy/step/types');
  return res.data as Array<StepType>;
}