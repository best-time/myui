function throttle(fn, wait = 100) {
  let prev = new Date();
  return function () {
    const now = new Date();
    if (now - prev > wait) {
      fn.apply(this, [].slice.call(arguments));
      prev = new Date();
    }
  };
}

