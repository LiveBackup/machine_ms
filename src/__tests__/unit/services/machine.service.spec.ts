import {expect} from '@loopback/testlab';
import {Machine} from '../../../models';
import {MachineRepository} from '../../../repositories';
import {MachineService} from '../../../services';
import {
  givenEmptyDatabase,
  givenMachine,
  givenRepositories,
} from '../../helpers/database.helpers';
import {givenServices} from '../../helpers/services.helpers';

describe('Unit testing - Machine service', () => {
  let machineRepository: MachineRepository;
  let machineService: MachineService;

  before(() => {
    ({machineRepository} = givenRepositories());
    ({machineService} = givenServices());
  });

  beforeEach(async () => {
    await givenEmptyDatabase();
  });

  describe('Machine creation', () => {
    it('Creates a new machine in DB', async () => {
      const newMachine: Partial<Machine> = {
        name: 'New machine',
        accountId: '1',
      };

      // Use the service to save the machine in DB
      const savedMachine = await machineService.create(newMachine);
      // Use the repository to get the created machine
      const repoMachine = await machineRepository.findById(savedMachine.id);

      expect(repoMachine.id).not.to.be.undefined();
      expect(repoMachine.name).to.be.equal(newMachine.name);
      expect(repoMachine.accountId).to.be.equal(newMachine.accountId);
    });

    it('Throws an error when ID is duplicated', async () => {
      const machine1 = givenMachine();
      const machine2 = givenMachine();

      // Save the first machine in DB
      await machineService.create(machine1);

      let error: Error | undefined = undefined;

      // Try to save the second machine with the same ID in DB
      try {
        await machineService.create(machine2);
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined();
      expect(error?.message).to.be.equal('Entrada duplicada para Machine.id');
    });
  });

  describe('Search by id', () => {
    it('Thow an error due the method has not been implemented', async () => {
      let error: Error | undefined = undefined;

      try {
        await machineService.findById('');
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined();
      expect(error?.message).to.be.equal('Method not implemented');
    });
  });

  describe('Search by account id', () => {
    it('Thow an error due the method has not been implemented', async () => {
      let error: Error | undefined = undefined;

      try {
        await machineService.findByAccountId('');
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined();
      expect(error?.message).to.be.equal('Method not implemented');
    });
  });

  describe('Updates by id', () => {
    it('Thow an error due the method has not been implemented', async () => {
      let error: Error | undefined = undefined;

      try {
        await machineService.updateById('', {});
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined();
      expect(error?.message).to.be.equal('Method not implemented');
    });
  });

  describe('Deletion by id', () => {
    it('Thow an error due the method has not been implemented', async () => {
      let error: Error | undefined = undefined;

      try {
        await machineService.deleteById('');
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined();
      expect(error?.message).to.be.equal('Method not implemented');
    });
  });
});
