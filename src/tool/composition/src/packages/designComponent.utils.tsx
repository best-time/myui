/*
import {VNodeChild} from "@vue/runtime-core";

interface iComponent {
    new(): JSX.Element & JSX.ElementClass,
}

const Component: iComponent = {} as any

let b: VNodeChild = <>111</>

b = '11'
b = true
b = false
b = [
    <div>111</div>,
    <div>222</div>,
    {},
    111,
    <Component/>
]*/

import type { VNodeChild } from "vue";
import type { Prop } from "@vue/runtime-core";

export type VueNode = VNodeChild;
export type RenderNode = VueNode;

export const renderNothing = () => null;

declare type RequiredKeysInPropOptions<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never;
}[keyof T];

declare type OptionalKeysInPropOptions<T> = Exclude<keyof T, RequiredKeysInPropOptions<T>>;

declare type InferPropType<T> = [T] extends [null]
  ? any
  : [T] extends [
        {
          type: null | true;
        },
      ]
    ? any
    : [T] extends [
          | ObjectConstructor
          | {
              type: ObjectConstructor;
            },
        ]
      ? Record<string, any>
      : [T] extends [
            | BooleanConstructor
            | {
                type: BooleanConstructor;
              },
          ]
        ? boolean
        : [T] extends [
              | DateConstructor
              | {
                  type: DateConstructor;
                },
            ]
          ? Date
          : [T] extends [
                | (infer U)[]
                | {
                    type: (infer U)[];
                  },
              ]
            ? U extends DateConstructor
              ? Date | InferPropType<U>
              : InferPropType<U>
            : [T] extends [Prop<infer V, infer D>]
              ? unknown extends V
                ? D
                : V
              : T;

export declare type ExtractComponentPropTypes<O> = O extends object
  ? {
      [K in keyof O]?: unknown;
    } & // This is needed to keep the relation between the option prop and the props, allowing to use ctrl+click to navigate to the prop options. see: #3656
    {
      [K in RequiredKeysInPropOptions<O>]: InferPropType<O[K]>;
    } & {
      [K in OptionalKeysInPropOptions<O>]?: InferPropType<O[K]>;
    }
  : {
      [K in string]: any;
    };

export default {};
