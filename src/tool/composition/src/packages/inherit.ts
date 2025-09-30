import type { AudioHTMLAttributes, ButtonHTMLAttributes, CanvasHTMLAttributes, ColHTMLAttributes, FormHTMLAttributes, HTMLAttributes, HtmlHTMLAttributes, IframeHTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, LiHTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, TextareaHTMLAttributes, SVGAttributes } from "vue";

export type InheritAttributes<T> = T extends typeof HTMLAudioElement ? AudioHTMLAttributes : T extends typeof HTMLButtonElement ? ButtonHTMLAttributes : T extends typeof HTMLCanvasElement ? CanvasHTMLAttributes : T extends typeof HTMLTableColElement ? ColHTMLAttributes : T extends typeof HTMLFormElement ? FormHTMLAttributes : T extends typeof HTMLIFrameElement ? IframeHTMLAttributes : T extends typeof HTMLImageElement ? ImgHTMLAttributes : T extends typeof HTMLInputElement ? InputHTMLAttributes : T extends typeof HTMLLabelElement ? LabelHTMLAttributes : T extends typeof HTMLLIElement ? LiHTMLAttributes : T extends typeof HTMLTableElement ? TableHTMLAttributes : T extends typeof HTMLTextAreaElement ? TextareaHTMLAttributes : T extends typeof HTMLTableCellElement ? TdHTMLAttributes : T extends typeof HTMLDivElement ? HTMLAttributes : T extends typeof SVGElement ? SVGAttributes : T extends typeof HTMLElement ? HtmlHTMLAttributes : T;

// type A = InheritAttributes<typeof HTMLTableCellElement>

export const iHTMLAudioElement = {} as typeof HTMLAudioElement;
export const iHTMLButtonElement = {} as typeof HTMLButtonElement;
export const iHTMLCanvasElement = {} as typeof HTMLCanvasElement;
export const iHTMLTableColElement = {} as typeof HTMLTableColElement;
export const iHTMLFormElement = {} as typeof HTMLFormElement;
export const iHTMLIFrameElement = {} as typeof HTMLIFrameElement;
export const iHTMLImageElement = {} as typeof HTMLImageElement;
export const iHTMLInputElement = {} as typeof HTMLInputElement;
export const iHTMLLabelElement = {} as typeof HTMLLabelElement;
export const iHTMLLIElement = {} as typeof HTMLLIElement;
export const iHTMLTableElement = {} as typeof HTMLTableElement;
export const iHTMLTextAreaElement = {} as typeof HTMLTextAreaElement;
export const iHTMLTableCellElement = {} as typeof HTMLTableCellElement;
export const iHTMLDivElement = {} as typeof HTMLDivElement;
export const iHTMLElement = {} as typeof HTMLElement;
