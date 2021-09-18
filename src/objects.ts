export class RequestObject {
  id: number | string;
  method: string;
  params?: object | Array<any>;
  jsonrpc: string;

  constructor(id?: number | string, method?: string, params?: object | Array<any>) {
    this.id = id;
    this.method = method;
    this.params = params;
    this.jsonrpc = '2.0';
  }
}

export class NotificationObject {
  method: string;
  params?: object | Array<any>;
  jsonrpc: string;

  constructor(method?: string, params?: object | Array<any>) {
    this.method = method;
    this.params = params;
    this.jsonrpc = '2.0';
  }
}

export class ErrorObject {
  code: number;
  message: string;
  data?: any;

  constructor(code?: number, message?: string, data?: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponseObject {
  id: number | string;
  error: ErrorObject;
  jsonrpc: string;

  constructor(id?: number | string, error?: ErrorObject) {
    this.id = id;
    this.error = error;
    this.jsonrpc = '2.0';
  }
}

export class ResultResponseObject {
  id: number | string;
  result: any;
  jsonrpc: string;

  constructor(id?: number | string, result?: any) {
    this.id = id;
    this.result = result;
    this.jsonrpc = '2.0';
  }
}
