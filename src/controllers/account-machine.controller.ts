import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {Machine} from '../models';
import {MachineService, MachineServiceBindings} from '../services';

export class AccountMachineController {
  constructor(
    @inject(MachineServiceBindings.SERVICE)
    protected machineService: MachineService,
  ) {}

  @get('/account/{accountId}/machines')
  @response(200, {
    description: 'List of machines associated with the account',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Machine),
        },
      },
    },
  })
  async getAccountMachines(
    @param.path.string('accountId') accountId: string,
  ): Promise<Machine[]> {
    throw new Error('Method not implemented');
  }
}
