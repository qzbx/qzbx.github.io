// typescript で scss module 型 OK にする
declare module "*.scss" {
  const value: {[className: string]: string};
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}
