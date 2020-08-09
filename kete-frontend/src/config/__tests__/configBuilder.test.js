import ConfigBuilder from '../ConfigBuilder';
import ObjectProvider from '../providers/ObjectProvider';
import JsonStorageProvider from '../providers/JsonStorageProvider';

describe('config builder', () => {

  test('test', () => {
    const schema = {
      one: {
        type: 'string',
        default: '1'
      },
      two: {
        type: 'string',
        default: '1'
      },
      three: {
        type: 'string',
        default: '1'
      },
      four: {
        type: 'string',
      },
    };
    const windowConfig = {
      two: '2',
      three: '2',
    };
    const storageValues = {
      config: JSON.stringify({ three: '3' })
    };
    const storage = {
      getItem(k) {
        return storageValues[k];
      }
    };
    const config = new ConfigBuilder(schema)
      .addLayer({ name: 'window', provider: new ObjectProvider(windowConfig) })
      .addLayer({ name: 'storage', provider: new JsonStorageProvider({ storage, key: 'config' }) })
      .build();
    expect(config.one).toEqual('1');
    expect(config.two).toEqual('2');
    expect(config.three).toEqual('3');
    expect(config.four).toBeUndefined();
    expect(config.unknown).toBeUndefined();
  });

});
