import {Machine} from '../../models';
import {MachineRepository} from '../../repositories';
import {machineTestdb} from '../fixtures/datasources';

// Clear the testing database
export const givenEmptyDatabase = async function () {
  const {machineRepository} = givenRepositories();

  await machineRepository.deleteAll();
};

export const givenRepositories = function () {
  const machineRepository = new MachineRepository(machineTestdb);

  return {machineRepository};
};

// Return an Machine Object using the given data
export const givenMachine = function (data?: Partial<Machine>): Machine {
  return Object.assign(
    {
      id: '1',
      name: 'Machine',
      accountId: '1',
    },
    data,
  ) as Machine;
};
