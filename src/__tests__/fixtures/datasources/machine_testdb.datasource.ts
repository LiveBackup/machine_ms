import {juggler} from '@loopback/repository';

const config = {
  name: 'machine_testdb',
  connector: 'memory',
};

export const machineTestdb: juggler.DataSource = new juggler.DataSource(config);
