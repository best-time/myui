import {
  extend,
  getObjKeys,
  ErrorResult,
} from './internal/index';

const baseTool = {
  toResult(p: any) {
    return p
      .then((v: any) => {
        if (!v.data.success) return Promise.reject(new ErrorResult(v.data));
        return Promise.resolve([null, v.data.data]);
      })
      .catch((e: any) => Promise.resolve([e, null]));
  },
  deepCopy(dist: any, target: any) {
    return extend(dist, target, true);
  },
  copy(dist: any, target: any) {
    return extend(dist, target, false);
  },
  filterEmptyParams(o: any) {
    let tar: any = {};
    getObjKeys(o).forEach((i: any) => {
      if (o[i] && o[i] - -1 !== 0) {
        tar[i] = o[i];
      }
    });
    return tar;
  },
};

const tool = baseTool;

export {tool};
