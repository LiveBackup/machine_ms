import {inject} from '@loopback/core';
import {
  Response,
  RestBindings,
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Machine} from '../models';
import {MachineService, MachineServiceBindings} from '../services';

export const noIdMachineSchema = getModelSchemaRef(Machine, {
  title: 'No ID Machine',
  partial: true,
  exclude: ['id'],
});

export class MachineController {
  constructor(
    @inject(RestBindings.Http.RESPONSE)
    protected httpResponse: Response,
    @inject(MachineServiceBindings.SERVICE)
    protected machineService: MachineService,
  ) {}

  @post('/machine')
  @response(201, {
    description: 'Created machine',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine),
      },
    },
  })
  async createMachine(
    @requestBody({
      content: {
        'application/json': {
          schema: noIdMachineSchema,
        },
      },
    })
    newMachine: Machine,
  ): Promise<Machine> {
    throw new Error('Method not implemented');
  }

  @get('/machine/{id}')
  @response(200, {
    description: 'Machine information by its ID',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine),
      },
    },
  })
  async getMachineById(@param.path.string('id') id: string): Promise<Machine> {
    throw new Error('Method not implemented');
  }

  @put('/machine/{id}')
  @response(200, {
    description: 'Updated machine information',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine),
      },
    },
  })
  async updateMachine(
    @param.path.string('id') id: string,
    @requestBody({
      description: 'New machine information',
      content: {
        'application/json': {
          schema: noIdMachineSchema,
        },
      },
    })
    newMachineInfo: Partial<Machine>,
  ): Promise<Machine> {
    throw new Error('Method not implemented');
  }

  @del('/machine/{id}')
  @response(200, {
    description: 'Deleted machine',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine),
      },
    },
  })
  async deleteMachine(@param.path.string('id') id: string): Promise<Machine> {
    throw new Error('Method not implemented');
  }
}
