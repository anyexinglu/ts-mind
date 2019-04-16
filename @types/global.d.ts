/**
 * COMMON PART
 */
type IMAnyCall<Arg extends any[] = any[], Return = any> = (...arg: Arg) => Return;
type IMEmpty = undefined | null | "";
type IMUnionNull<Tar> = Tar | null;
type IMKeyValue<V = any> = { [k: string]: V };
type IMCSSStyleMap = IMKeyValue;

interface IMPosition {
  x: number;
  y: number;
}
interface IMPositionDefect {
  x?: number;
  y?: number;
}

/**
 * CUSTOM PART, WIDTH NAMESPACE
 */
// Topic topic type
type IMTheme = string;
type IMTopicTopic = string;
type IMTopicPrivateData<T = {}> = IMKeyValue & T;
type IMMindPrivateData<T = {}> = IMKeyValue & T;

/**
 * DATA SOURCE
 */
// source data type
type IMSourceFormatType = string;
type IMSourceData<Source> = {
  meta: IMSourceMeta;
  format: IMSourceFormatType;
  data: Source;
};
interface IMSourceMeta {
  name: string;
  author: any;
  version: string;
}

/**
 * provider defination
 */
interface IMProviderCustom<CTX, Provider> {
  new (ctx: CTX): Provider;
}