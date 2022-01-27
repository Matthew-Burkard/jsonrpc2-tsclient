import { ErrorObject } from "./objects.js";

const PARSE_ERROR = new ErrorObject(-32700, "Parse error");
const INVALID_REQUEST = new ErrorObject(-32600, "Invalid Request");
const METHOD_NOT_FOUND = new ErrorObject(-32601, "Method not found");
const INVALID_PARAMS = new ErrorObject(-32602, "Invalid params");
const INTERNAL_ERROR = new ErrorObject(-32603, "Internal error");

export class JSONRPCError extends Error {
  constructor(error: ErrorObject) {
    let msg = `${error.code}: ${error.message}`;
    if (error.data !== undefined) {
      try {
        msg += ` - ${error.data.toString()}`;
      } catch (_e) {
        msg += ` - ${error.data}`;
      }
    }
    super(msg);

    Object.setPrototypeOf(this, JSONRPCError.prototype);
  }
}

export class ParseError extends JSONRPCError {
  constructor(error?: ErrorObject) {
    super(error || PARSE_ERROR);

    Object.setPrototypeOf(this, ParseError.prototype);
  }
}

export class InvalidRequest extends JSONRPCError {
  constructor(error?: ErrorObject) {
    super(error || INVALID_REQUEST);

    Object.setPrototypeOf(this, InvalidRequest.prototype);
  }
}

export class MethodNotFound extends JSONRPCError {
  constructor(error?: ErrorObject) {
    super(error || METHOD_NOT_FOUND);

    Object.setPrototypeOf(this, MethodNotFound.prototype);
  }
}

export class InvalidParams extends JSONRPCError {
  constructor(error?: ErrorObject) {
    super(error || INVALID_PARAMS);

    Object.setPrototypeOf(this, InvalidParams.prototype);
  }
}

export class InternalError extends JSONRPCError {
  constructor(error?: ErrorObject) {
    super(error || INTERNAL_ERROR);

    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

export class ServerError extends JSONRPCError {
  constructor(error: ErrorObject) {
    super(error);

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

const errorCodeMap = new Map();
errorCodeMap.set("-32700", ParseError);
errorCodeMap.set("-32600", InvalidRequest);
errorCodeMap.set("-32601", MethodNotFound);
errorCodeMap.set("-32602", InvalidParams);
errorCodeMap.set("-32603", InternalError);

export function getErrorByCode(code) {
  return errorCodeMap.get(code as string);
}
