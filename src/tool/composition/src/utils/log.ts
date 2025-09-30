import { createLogger } from "@peryl/utils/createLogger";

export const log = createLogger("peryl-vue-compose", "log");
export const warn = createLogger("peryl-vue-compose", "warn");
export const error = createLogger("peryl-vue-compose", "error");
