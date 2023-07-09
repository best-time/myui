import {isArray} from './base';

const extend = (orig: any, target: any, deep = true): any => {
  orig = orig || {};
  for (let i in target) {
    if (deep === true && target.hasOwnProperty(i)) {
      if (typeof target[i] === 'object') {
        if (!orig[i]) {
          orig[i] = isArray(target[i]) ? [] : {};
        }
        extend(orig[i], target[i]);
      } else {
        orig[i] = target[i];
      }
    } else orig[i] = target[i];
  }
  return orig;
};

export default extend