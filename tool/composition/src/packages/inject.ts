export interface InjectValue<Refer> {
  (): Refer;

  <DefaultValue>(defaultValue?: DefaultValue): Refer | DefaultValue;
}

export default {};
