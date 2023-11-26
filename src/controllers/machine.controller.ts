import {inject} from '@loopback/core';
import {
  HttpErrors,
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
    newMachine: Partial<Machine>,
  ): Promise<Machine> {
    // Create the machine in DB
    const createdMachine = await this.machineService.create(newMachine);

    // Set the response code to 201 and return the createdMachine
    this.httpResponse.status(201);
    return createdMachine;
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
    // Get the machine info using the service
    const machine = await this.machineService.findById(id);

    // Verify the machine exists
    if (!machine)
      throw new HttpErrors[404]('There not exists a machine with the given ID');

    return machine;
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
