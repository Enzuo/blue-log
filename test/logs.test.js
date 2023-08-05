import configureStore from 'redux-mock-store';

import { LIFECYCLE, KEY } from 'redux-pack';

// import { store } from '../redux/store';

import database from '../src/database/database.jest';

import { clearDataset, insertDataset } from './testDataset';

import { listLog } from '../src/logic/logs'

beforeAll(() => {
  jest.setTimeout(15000);
  return database.init();
});

// const mockStore = configureStore();
// const store = mockStore();

// Redux pack

// this utility method will make an action that redux pack understands
function makePackAction(lifecycle, { type, payload, meta={} }) {
  return {
    type,
    payload,
    meta: {
      ...meta,
      [KEY.LIFECYCLE]: lifecycle,
    },
  }
}



// Tests

describe('logs action creator', () => {
  beforeEach(() => { // Runs before each test in the suite
    // store.clearActions();
    return clearDataset();
  });

  test('get logs', async () => {
    await insertDataset('logs.test.sql')

    let result = await listLog()
    console.log(result)
  });
});
