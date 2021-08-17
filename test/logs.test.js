import configureStore from 'redux-mock-store';

import { LIFECYCLE, KEY } from 'redux-pack';

// import { store } from '../redux/store';

import logsReducer, { deleteLogs, addRecipeLog, loadLogs } from '../redux/logs';
import database from '../database';

import { clearDataset, insertDataset } from './testDataset';

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

  test('deleteLogs', async () => {
    // const expectedActions = [
    //   {
    //     'payload': 1,
    //     'type': 'select_avatar',
    //   },
    // ];
    await insertDataset('logs.test.sql');

    const before = await database.querySql('SELECT * FROM "Log";');
    expect(before[0].res.rows.length).toEqual(3);
    const actionPack = deleteLogs([1, 2]);
    const result = await actionPack.promise;
    expect(result).toEqual([1, 2]);
    const after = await database.querySql('SELECT * FROM "Log";');
    expect(after[0].res.rows.length).toEqual(1);


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

  test('addRecipeLog', async () => {
    const recipeLog = {
      id: undefined,
      date: 123,
      qty: 1, // TODO bug if null with treeize
      name: 'testRecipe',
      products: [
        {
          name: 'carrote',
        },
        {
          name: 'choux',
        },
      ],
    };

    await insertDataset('logs.test.sql');

    const actionPack = addRecipeLog(recipeLog);
    const result = await actionPack.promise;
    console.log(result);
    expect(result.id).toBe(4);
    expect(result.date).toBe(123);
    expect(result.qty).toBe(1);
    expect(result.name).toBe('testRecipe');
    expect(result.products).toHaveLength(2);
    expect(result.products[0].name).toBe('carrote');
    expect(result.products[1].name).toBe('choux');

    const after = await database.querySql('SELECT * FROM "RecipeLogProduct";');
    expect(after[0].res.rows).toHaveLength(2);
  });

  test('listLog', async () => {
    try {
      await insertDataset('logs.test.sql');
      const actionPack = await loadLogs();
      const result = await actionPack.promise;
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  });
});
