declare module 'marked' {
  export function parse(src: string): string;
  export const marked: { parse: (src: string) => string };
  const _default: typeof marked;
  export default _default;
}
