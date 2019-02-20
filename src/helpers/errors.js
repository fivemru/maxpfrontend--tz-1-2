import errors from '../constants/errors';

export function errMsg(msg) {
  return errors[msg] || msg;
}

export class ResponseError extends Error {
  constructor(message, response) {
    super();
    this.name = 'ResponseError';
    this.message = message;
    this.response = response;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }

  toString() {
    const { message } = this;
    return errMsg(message);
  }
}

export function parseError(payload) {
  let msg;

  // standart error type or its successor
  if (payload instanceof Error) {
    msg = payload.toString();
  }

  // request failed
  else if (payload instanceof Response) {
    msg = `Code: ${payload.status}, Detail: ${payload.statusText}`;
  }

  // text
  else {
    msg = errMsg(payload);
  }
  return msg;
}
