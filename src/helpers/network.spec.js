import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as t from '../constants/ActionTypes';
import { API_URL } from '../constants';
import { ResponseError } from '../helpers/errors';
import { httpRequest } from './network';

describe('httpRequest(): catching errors', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('received error status and error message from server', () => {
    // api answer
    fetchMock.getOnce(API_URL, {
      body: { status: t.API_FAILED_STATUS, message: 'wrong_email_or_password' }
    });

    const expectedResult = new ResponseError('wrong_email_or_password');
    return httpRequest().catch(err => expect(err).toEqual(expectedResult));
  });

  it('received unknown status from server', () => {
    // api answer
    fetchMock.getOnce(API_URL, {
      body: { status: 'some unknown status' }
    });

    const expectedResult = new ResponseError('unknown_server_status');
    return httpRequest().catch(err => expect(err).toEqual(expectedResult));
  });

  it('received error status but empty error message', () => {
    // api answer
    fetchMock.getOnce(API_URL, {
      body: { status: t.API_FAILED_STATUS }
    });

    const expectedResult = new ResponseError('empty_message_from_server');
    return httpRequest().catch(err => expect(err).toEqual(expectedResult));
  });

  it('network status code is 404 -> ResponseError("network_error")', () => {
    // api answer
    fetchMock.getOnce(API_URL, 404);

    const expectedResult = new ResponseError('network_error');
    return httpRequest().catch(err => expect(err).toEqual(expectedResult));
  });

  it('replacing TypeError("Failed to fetch") to ResponseError("network_error")', () => {
    // api answer
    fetchMock.getOnce(API_URL, {
      throws: new TypeError('Failed to fetch')
    });

    const expectedResult = new ResponseError('network_error');
    return httpRequest().catch(err => expect(err).toEqual(expectedResult));
  });

  it('throw new Error("Some unexpected error")', () => {
    // api answer
    fetchMock.getOnce(API_URL, {
      throws: new Error('Some unexpected error')
    });

    const expectedResult = new Error('Some unexpected error');
    return httpRequest().catch(err => expect(err).toEqual(expectedResult));
  });
});
