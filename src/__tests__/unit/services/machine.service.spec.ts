import {expect} from '@loopback/testlab';
import {MachineService} from '../../../services';
import {givenEmptyDatabase} from '../../helpers/database.helpers';
import {givenServices} from '../../helpers/services.helpers';

describe('Unit testing - Machine service', () => {
  let machineService: MachineService;

  before(() => {
    ({machineService} = givenServices());
  });

  beforeEach(async () => {
    await givenEmptyDatabase();
  });

  describe('Machine creation', () => {
    it('Thow an error due the method has not been implemented', async () => {
      let error: Error | undefined = undefined;

      try {
        await machineService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).not.to.be.undefined();
      expect(error?.message).to.be.equal('Method not implemented');
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
