const uuidv1 = require('uuid/v1');
const reporter = require('./reporter');

//记录所有的请求状态
let REQUEST_CONTAINER = {}
//发出的请求总数
let REQUEST_COUNT = 0;
//请求成功的数量
let SUCCESS_REQUEST_COUNT = 0;
//请求失败的数量
let FAIL_REQUEST_COUNT = 0;
//并发数
const CONCURRENCY = 30
//启动时间
const SYS_START_TIME = new Date().getTime();

let SYS_END_TIME = null;
//请求持续时间 10 s
const REQUEST_DURATOIN = 5 * 1000;

const HttpHelper = require('./httpHelper');

function main() {
  for (let i = 0; i < CONCURRENCY; i++) {
    const reqId = uuidv1();
    REQUEST_CONTAINER[reqId] = {
      reqId: reqId,
      startAt: new Date().getTime(),
      endAt: null,
      status: 'wait',
    }
    REQUEST_COUNT++;
    let sender = new HttpHelper({
      reqId: reqId,
      onSuccess: () => {
        SUCCESS_REQUEST_COUNT++;
        REQUEST_CONTAINER[reqId].endAt = new Date().getTime()
        REQUEST_CONTAINER[reqId].status = 'success'
      },
      onFail: () => {
        FAIL_REQUEST_COUNT++;
        REQUEST_CONTAINER[reqId].endAt = new Date().getTime()
        REQUEST_CONTAINER[reqId].status = 'fail'
      },
    })
    sender.send();
  }
}

main();

