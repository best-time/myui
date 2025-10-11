export function run(func) {
  const oldFetch = window.fetch;

  const cache = {
    status: 'pending',
    value: null
  }
  function newFetch(...args) {
    if(cache.status === 'fulfilled') {
      return cache.value
    } else if (cache.status === 'rejected') {
      throw cache.value
    }
    const p = oldFetch(...args).then(res => res).then(data => {
      cache.status = 'fulfilled';
      cache.value = data
    }).catch(err => {
      cache.status = 'rejected';
      cache.value = err;
    });
    throw p
  }

  window.fetch = newFetch;

  try{
    func()
  } catch(err) {
    if(err instanceof Promise) {
      err.finally(() => {
        window.fetch = newFetch;
        func()
        window.fetch = oldFetch;
      })
    }
  }

  window.fetch = oldFetch;
}

/*

 function run(func: Fn) {
   console.log(1)
  const oldFetch = http.get;

  const cache = {
    status: 'pending',
    value: null
  }
  function newFetch(...args: any[]) {
    if(cache.status === 'fulfilled') {
      return cache.value
    } else if (cache.status === 'rejected') {
      throw cache.value
    }
    const p = oldFetch(...args).then(res => res).then(data => {
      console.log(2)
      cache.status = 'fulfilled';
      cache.value = data
    }).catch(err => {
      console.log(3)
      cache.status = 'rejected';
      cache.value = err;
    });
    throw p
  }

   http.get = newFetch as Fn;

  try{
    func()
  } catch(err) {
    if(err instanceof Promise) {
      console.log(4,  err)
      err.finally(() => {
        console.log(5)
        http.get = newFetch as Fn;
        func()
        http.get = oldFetch;
      })
    }
  }

   http.get = oldFetch;
}

 */