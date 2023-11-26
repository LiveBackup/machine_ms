import {BindingKey, BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Machine} from '../models';
import {MachineRepository} from '../repositories';

export namespace MachineServiceBindings {
  export const SERVICE = BindingKey.create<MachineService>(
    'services.MachineService',
  );
}

@injectable({scope: BindingScope.SINGLETON})
export class MachineService {
  constructor(
    @repository(MachineRepository)
    protected readonly machineRepository: MachineRepository,
  ) {}

  async create(newMachine: Partial<Machine>): Promise<Machine> {
    return this.machineRepository.create(newMachine);
  }

  async findById(id: string): Promise<Machine | null> {
    throw new Error('Method not implemented');
  }

  async findByAccountId(accountId: string): Promise<Machine[]> {
    return this.machineRepository.find({where: {accountId}});
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
