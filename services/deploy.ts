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
  try {
    const res = await api.get('/deploys');
    return res.data as Array<DeployGetBody>;
  } catch (error) {
    throw error;
  }
};

export const createDeploy = async (deploy: DeployCreateBody) => {
  try {
    const response = await api.post('/deploy', deploy);
    return response.data.deployId;
  } catch (error) {
    throw error;
  }
};

export const deleteDeployById = async  (deployId: number) => {
  try {
    await api.delete(`/deploy/${deployId}`);
  } catch (error) {
    throw error;
  }
} 