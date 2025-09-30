export const logger = (() => {
  const template = (msg: string) => `@peryl/vue-compose: ${msg}`;
  const log = (arg0: any, ...args: any[]) => console.log(template(arg0), ...args);
  const warn = (arg0: any, ...args: any[]) => console.warn(template(arg0), ...args);
  const error = (arg0: any, ...args: any[]) => console.error(template(arg0), ...args);

  const setupError = (name: string) => error(`${name} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement`);

  return { log, warn, error, setupError };
})();
