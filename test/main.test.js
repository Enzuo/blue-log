import database from '../src/database/database.jest'


beforeAll(async () => {
  jest.setTimeout(15000)
  await database.init()
});

test.only('main test', () => {
  console.log('main test')
});
