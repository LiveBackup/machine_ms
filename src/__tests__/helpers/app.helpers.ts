import {SequenceActions} from '@loopback/rest';
import {Client, createRestAppClient} from '@loopback/testlab';
import {MachineMsApplication} from '../../application';
import {machineTestdb} from '../fixtures/datasources';

export const givenRunningApp =
  async function (): Promise<MachineMsApplication> {
    const app = new MachineMsApplication({});
    await app.boot();

    // Diasble logging for testing
    app.bind(SequenceActions.LOG_ERROR).to(() => {});

    // Setup the app database and starts it
    app.bind('datasources.machine_db').to(machineTestdb);
    await app.start();

    return app;
  };

export const givenClient = async function (
  app: MachineMsApplication,
): Promise<Client> {
  return createRestAppClient(app);
};
