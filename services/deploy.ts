import { BuildStatus, DeployBuild, StepCommand } from './database';
import api from './index';

export type DeployBuildJSON = DeployBuild & BuildStatus;

export interface DeployGetBody {
  id: number;
  name: string;
  description: string;
  steps: Array<DeployStepBody>;
  builds: Array<DeployBuild & BuildStatus>;
}

export interface DeployStepBody {
  id: number;
  order: number;
  name: string;
  typeId: number;
  args?: StepCommand;
}

export interface DeployCreateBody {
  name: string;
  description: string;
  branch: string;
  workingDirectory: string;
  steps: Array<DeployStepBody>;
}

export interface DeployUpdateBody {
  name: string;
  description: string;
}

export const getDeploys = async () => {
  const res = await api.get('/deploys');
  return res.data as Array<DeployGetBody>;
};

export const createDeploy = async (deploy: DeployCreateBody) => {
  const response = await api.post('/deploy', deploy);
  return response.data.deployId;
};

export const runDeployBuildById = async (deployId: number) => {
  return api.post(`/deploy/build/run/${deployId}`);
};

export const deleteDeployById = async (deployId: number) => {
  return api.delete(`/deploy/${deployId}`);
};
