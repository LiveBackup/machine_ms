import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Machine} from '../models';
import {MachineRepository} from '../repositories';

@injectable({scope: BindingScope.SINGLETON})
export class MachineService {
  constructor(
    @repository(MachineRepository)
    protected readonly machineRepository: MachineRepository,
  ) {}

  async create(newMachine: Partial<Machine>): Promise<Machine> {
    throw new Error('Method not implemented');
  }

  async findById(id: string): Promise<Machine | null> {
    throw new Error('Method not implemented');
  }

  async findByAccountId(accountId: string): Promise<Machine[]> {
    throw new Error('Method not implemented');
  }

  async updateById(
    id: string,
    newData: Partial<Machine>,
  ): Promise<Machine | null> {
    throw new Error('Method not implemented');
  }

  async deleteById(id: string): Promise<Machine | null> {
    throw new Error('Method not implemented');
  }
}
