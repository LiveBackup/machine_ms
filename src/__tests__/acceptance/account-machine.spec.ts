import {Client, expect} from '@loopback/testlab';
import {MachineMsApplication} from '../../application';
import {Machine} from '../../models';
import {MachineRepository} from '../../repositories';
import {givenClient, givenRunningApp} from '../helpers/app.helpers';
import {
  givenEmptyDatabase,
  givenMachine,
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
  });

  beforeEach(async () => {
    await givenEmptyDatabase();
  });

  after(async () => {
    await app.stop();
  });

  describe(`Machines search by account - ${getMachinesByAccount} Endpoint`, () => {
    beforeEach(async () => {
      await machineRepository.createAll([
        givenMachine({id: undefined, name: 'Machine1', accountId: '1'}),
        givenMachine({id: undefined, name: 'Machine2', accountId: '1'}),
        givenMachine({id: undefined, name: 'Machine3', accountId: '2'}),
        givenMachine({id: undefined, name: 'Machine4', accountId: '1'}),
        givenMachine({id: undefined, name: 'Machine5', accountId: '2'}),
      ]);
    });

    it('Return the machines associated to an existing account', async () => {
      let response;

      // Ask for the account1 machines
      response = await client
        .get(getMachinesByAccount.replace('{accountId}', '1'))
        .expect(200);
      const account1Machines = response.body as Machine[];
      expect(account1Machines.length).to.be.equal(3);

      // Ask for the account2 machines
      response = await client
        .get(getMachinesByAccount.replace('{accountId}', '2'))
        .expect(200);
      const account2Machines = response.body as Machine[];
      expect(account2Machines.length).to.be.equal(2);
    });

    it('Return an empty array when does not found accounts', async () => {
      // Ask for the account3 machines
      const response = await client
        .get(getMachinesByAccount.replace('{accountId}', '3'))
        .expect(200);
      const account3Machines = response.body as Machine[];
      expect(account3Machines.length).to.be.equal(0);
    });
  });
});
