import {Client} from '@loopback/testlab';
import {MachineMsApplication} from '../../application';
import {MachineRepository} from '../../repositories';
import {givenClient, givenRunningApp} from '../helpers/app.helpers';
import {
  givenEmptyDatabase,
  givenRepositories,
} from '../helpers/database.helpers';

describe('e2e - Machine Controller', () => {
  // App utilities
  let app: MachineMsApplication;
  let client: Client;
  // Repositories
  let machineRepository: MachineRepository;
  // Endpoints to test
  const createMachine = '/machine';
  const getMachineById = '/machine/{id}';
  const updateMachine = '/machine/{id}';
  const deleteMachine = '/machine/{id}';

  before(async () => {
    ({machineRepository} = givenRepositories());
    app = await givenRunningApp();
    client = await givenClient(app);

    // TODO: Remove this
    console.log(client);
    console.log(machineRepository);
  });

  beforeEach(async () => {
    await givenEmptyDatabase();
  });

  after(async () => {
    await app.stop();
  });

  describe(`Machine creation - ${createMachine} Endpoint`, () => {});

  describe(`Machine search - ${getMachineById} Endpoint`, () => {});

  describe(`Machine update - ${updateMachine} Endpoint`, () => {});

  describe(`Machine deletion - ${deleteMachine} Endpoint`, () => {});
});
