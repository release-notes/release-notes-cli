'use strict';

const fs = require('fs');
const request = require('request');
const packageData = require('../package');

const defaultConfig = {
  baseUrl: 'https://release-notes.com/api/v1',
  useQuerystring: true,
  json: true,
  strictSSL: true,
  gzip: true,
};

class ApiClient {
  constructor(apiKey, config = {}) {
    this.config = config;
    this.headers = {
      'User-Agent': `release-notes-cli@${packageData.version}`,
      Authorization: `Bearer ${apiKey}`,
    };
  }

  publish({ file, scope, name }) {
    return this.makeRequest('/publish', {
      method: 'POST',
      formData: {
        scope,
        name,
        file: fs.createReadStream(file),
      },
    });
  }

  /**
   * Make calls against the release-notes api.
   *
   * @param endpoint
   * @param options
   * @returns {Promise}
   * @private
   */
  makeRequest(endpoint, options = {}) {
    const requestOptions = this.buildRequestOptions(
      defaultConfig, this.config, { uri: endpoint }, options
    );

    return new Promise((resolve, reject) => {
      request(requestOptions, ApiClient.getPromiseResponseHandler(resolve, reject));
    });
  }

  static getPromiseResponseHandler(resolve, reject) {
    return (err, response, body) => {
      if (err) {
        return reject(err);
      }

      if (response.statusCode >= 400) {
        const errorResponse = new Error((body && body.message) || response.statusCode);

        errorResponse.statusCode = response.statusCode;
        errorResponse.code = body && body.code;

        return reject(errorResponse);
      }

      return resolve(body);
    };
  }

  buildRequestOptions(...configs) {
    const config = Object.assign({}, ...configs);

    config.headers = Object.assign({}, config.headers, this.headers);

    return config;
  }
}

module.exports = ApiClient;
