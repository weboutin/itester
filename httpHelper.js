/**
 * 构造 HTTP 请求
 */

const http = require('http');

class HttpSender {
  constructor(opt) {
    this.onSuccess = opt.onSuccess;
    this.onFail = opt.onFail;
    this.requId = opt.requId;
  }
  send() {
    http.get('http://127.0.0.1:4003/', (res) => {
      const { statusCode } = res;
      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
      }
      if (error) {
        res.resume();
        this.onFail();
        return;
      }
      // res.on('data', () => { })
      // res.on('end', () => {
      //   this.onSuccess()
      // })
    }).on('error', (e) => {
      this.onFail();
    })
  }
}

module.exports = HttpSender;
