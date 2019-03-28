import configureStore from 'redux-mock-store';

import { LIFECYCLE, KEY } from 'redux-pack';

// import { store } from '../redux/store';

import logsReducer, { deleteLogs } from '../redux/logs';
import database from '../database';

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
  });

  test('deleteLogs', async () => {
    // const expectedActions = [
    //   {
    //     'payload': 1,
    //     'type': 'select_avatar',
    //   },
    // ];

    const before = await database.querySql('SELECT * FROM "Log";');
    expect(before[0].res.rows.length, 3);
    const actionPack = deleteLogs([1, 2]);
    const result = await actionPack.promise;
    expect(result, [1, 2]);
    const after = await database.querySql('SELECT * FROM "Log";');
    expect(after[0].res.rows.length, 1);


    // store.dispatch(deleteLogs(1));
    // expect(store.getActions()).toEqual(expectedActions);

    // your test code would then look something like...
    // const initialState = {};
    // const expectedEndState = {};
    // const action = makePackAction(LIFECYCLE.START, deleteLogs(1));
    // const endState = logsReducer(initialState, action);
    // console.log(endState, expectedEndState);
    // assertDeepEqual(endState, expectedEndState);
  });

});
