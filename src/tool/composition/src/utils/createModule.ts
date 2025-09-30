import { createPlainModule } from "@peryl/utils/createPlainModule";
import { markRaw, onBeforeUnmount, reactive } from "vue";

export function createModule<
  /*@formatter:off*/
  DefaultConfig extends Record<string, any>,
  CustomConfig extends Record<string, any>,
  UseConfig extends CustomConfig & Partial<DefaultConfig>,
  OptionConfig extends CustomConfig & DefaultConfig,
  Option extends { config: OptionConfig; useConfig: UseConfig; defaultConfig: DefaultConfig },
  /*@formatter:on*/
>(name: string) {
  return createPlainModule<
    /*@formatter:off*/
    DefaultConfig,
    CustomConfig,
    UseConfig,
    OptionConfig,
    Option
    /*@formatter:on*/
  >({
    name,
    onBeforeUnmount,
    reactive: reactive as any,
    markRaw,
  });
}
