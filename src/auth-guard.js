import {store} from './store'
import { networkInterfaces } from 'os';

export default (to, from, next) => {
  if(store.getters.user) {
    next();
  } else {
    next('/signin');
  }
}