import {Client} from '@loopback/testlab';
import {MachineMsApplication} from '../../application';
import {MachineRepository} from '../../repositories';
import {givenClient, givenRunningApp} from '../helpers/app.helpers';
import {
  givenEmptyDatabase,
  givenRepositories,
} from '../helpers/database.helpers';

describe('e2e - AccountMachine Controller', () => {
  // App utilities
  let app: MachineMsApplication;
  let client: Client;
  // Repositories
  let machineRepository: MachineRepository;
  // Endpoints to test
  const getMachinesByAccount = '/account/{accountId}/machines';

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

  describe(`Machines search by account - ${getMachinesByAccount} Endpoint`, () => {});
});
