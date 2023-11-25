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
  });

  beforeEach(async () => {
    await givenEmptyDatabase();
  });

  after(async () => {
    await app.stop();
  });

  describe(`Machine creation - ${createMachine} Endpoint`, () => {
    it('Creates a single machine', async () => {
      // Create the new Machine request object
      const newMachine = givenMachine({id: undefined});

      // Send the request and expect a 201 response code
      const response = await client
        .post(createMachine)
        .send(newMachine)
        .expect(201);
      const responseMachine = response.body as Machine;
      expect(responseMachine.id).not.to.be.undefined();

      // Get the stored machine info
      const savedMachine = await machineRepository.findById(responseMachine.id);

      expect(savedMachine.name).to.be.equal(newMachine.name);
      expect(savedMachine.accountId).to.be.equal(newMachine.accountId);
    });

    it('Creates several machines', async () => {
      const machines = ['Machine1', 'Machine2', 'Machine3'].map(name =>
        givenMachine({id: undefined, name}),
      );

      for (const machine of machines) {
        // Send the request and expect a 201 response code
        const response = await client
          .post(createMachine)
          .send(machine)
          .expect(201);
        const responseMachine = response.body as Machine;
        expect(responseMachine.id).not.to.be.undefined();

        // Get the stored machine info
        const savedMachine = await machineRepository.findById(
          responseMachine.id,
        );

        expect(savedMachine.name).to.be.equal(machine.name);
        expect(savedMachine.accountId).to.be.equal(machine.accountId);
      }
    });

    it('Rejects when name length is less than 3', async () => {
      // Creat the machine request object
      const newMachine = givenMachine({id: undefined, name: 'PC'});

      // Send the request and expected the rejection code
      await client.post(createMachine).send(newMachine).expect(422);
    });

    it('Rejects when machine ID is provided for creation', async () => {
      // Creat the machine request object
      const newMachine = givenMachine({id: 'some_id'});

      // Send the request and expected the rejection code
      await client.post(createMachine).send(newMachine).expect(422);
    });
  });

  describe(`Machine search - ${getMachineById} Endpoint`, () => {});

  describe(`Machine update - ${updateMachine} Endpoint`, () => {});

  describe(`Machine deletion - ${deleteMachine} Endpoint`, () => {});
});
