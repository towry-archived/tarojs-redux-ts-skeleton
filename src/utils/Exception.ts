
export default class Exception extends Error {
  info: any;
  type: string;

  constructor(message: string, type?: string, info?: any) {
    super(message);

    this.name = 'Exception';
    this.type = type || "UNKNOWN";
    this.info = info;
  }
}
