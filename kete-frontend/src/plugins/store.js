import createStore from './createStore';
import config from '@/config';
import callApi from '@/apiClient';

export default createStore({ config, callApi });
