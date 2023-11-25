import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MachineDbDataSource} from '../datasources';
import {Machine, MachineRelations} from '../models';

export class MachineRepository extends DefaultCrudRepository<
  Machine,
  typeof Machine.prototype.id,
  MachineRelations
> {
  constructor(
    @inject('datasources.machine_db') dataSource: MachineDbDataSource,
  ) {
    super(Machine, dataSource);
  }
}
