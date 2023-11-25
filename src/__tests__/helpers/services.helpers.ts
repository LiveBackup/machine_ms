import {MachineService} from '../../services';
import {givenRepositories} from './database.helpers';

export const givenServices = function () {
  const {machineRepository} = givenRepositories();

  const machineService = new MachineService(machineRepository);

  return {machineService};
};
