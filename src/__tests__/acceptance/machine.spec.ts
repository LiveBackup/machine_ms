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

  describe(`Machine search - ${getMachineById} Endpoint`, () => {
    it('Gets the machine using its ID', async () => {
      // Create the machine
      const newMachine = givenMachine({id: '1'});
      await machineRepository.create(newMachine);

      // Get the store machine using the endpoint
      const response = await client
        .get(getMachineById.replace('{id}', '1'))
        .expect(200);
      const machine = response.body as Machine;

      expect(machine.name).to.be.equal(newMachine.name);
      expect(machine.accountId).to.be.equal(newMachine.accountId);
    });

    it('Returns 404 code when no machine is found', async () => {
      // Create a machine
      const newMachine = givenMachine({id: 'some_id'});
      await machineRepository.create(newMachine);

      // Query the machine for a diferent ID and expect to fail
      await client.get(getMachineById.replace('{id}', '1')).expect(404);
    });
  });

  describe(`Machine update - ${updateMachine} Endpoint`, () => {});

  describe(`Machine deletion - ${deleteMachine} Endpoint`, () => {
    // The machines to test with
    let machine1: Machine;

    beforeEach(async () => {
      const machines = ['Machine1', 'Machine2'].map(name => {
        return givenMachine({id: undefined, name});
      });

      [machine1] = await machineRepository.createAll(machines);
    });

    it('Deletes a machine', async () => {
      // Get the store machine using the endpoint
      const response = await client
        .del(deleteMachine.replace('{id}', machine1.id))
        .expect(200);
      const machine = response.body as Machine;

      // Check the values of returned machine
      expect(machine.id).to.be.equal(machine1.id);
      expect(machine.name).to.be.equal(machine1.name);
      expect(machine.accountId).to.be.equal(machine1.accountId);

      // Check the number of Machines in DB has decreased
      const machinesCount = await machineRepository.count();
      expect(machinesCount.count).to.be.equal(1);
    });

    it('Does not found the machine with the given ID', async () => {
      // Get the store machine using the endpoint
      await client
        .del(deleteMachine.replace('{id}', 'is not the machine1.id'))
        .expect(404);

      // Check the number of Machines in DB has decreased
      const machinesCount = await machineRepository.count();
      expect(machinesCount.count).to.be.equal(2);
    });
  });
});
