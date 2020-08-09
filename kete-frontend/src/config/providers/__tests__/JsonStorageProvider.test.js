import JsonStorageProvider from '../JsonStorageProvider';

describe('JsonStorageProvider', () => {

  beforeEach(() => {
    global.window = {};
    const storage = {};
    global.localStorage = {
      setItem(k,v) {
        storage[k] = v;
      },
      getItem(k) {
        return storage[k];
      }
    };
  });

  test('test', () => {
    localStorage.setItem('config', JSON.stringify({ foo: 'bar' }));
    const provider = new JsonStorageProvider({ key: 'config', storage: localStorage });
    expect(provider.getValue('foo')).toEqual('bar');
  });

});
