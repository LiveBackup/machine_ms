import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  name: 'machine_db',
  connector: 'postgresql',
  host: process.env.MACHINE_DB_HOST ?? 'localhost',
  port: +(process.env.MACHINE_DB_PORT ?? 5432),
  user: process.env.MACHINE_DB_USER,
  password: process.env.MACHINE_DB_PASSWORD,
  database: process.env.MACHINE_DB_DATABASE,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MachineDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'machine_db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.machine_db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
