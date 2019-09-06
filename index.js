const http = require('http')
const querystring = require('querystring')
const uuidv1 = require('uuid/v1')
let allRequest = {}
const concurrency = 100
function result() {
  let totalTime = 0;
  for (let reqId in allRequest) {
    totalTime = totalTime + allRequest[reqId].usedTime
  }
  console.log("QPS")
  console.log(totalTime / concurrency)
}
setInterval(() => {
  result();
}, 1000)

const iStartTime = new Date().getTime();

async function excutCurrency() {
  for (let i = 0; i < concurrency; i++) {
    send()
  }
  let now = new Date().getTime();
  //1min
  if (now - iStartTime > 2 * 1000) {
    return
  }
  setTimeout(() => {
    excutCurrency();
  }, 1)
}

excutCurrency();

function send() {
  let reqId = uuidv1();
  allRequest[reqId] = {
    status: 'wait',
    startTime: new Date().getTime(),
    endTime: null,
    usedTime: null
  }
  const postData = querystring.stringify({
    'msg': 'Hello World!'
  });
  const options = {
    hostname: '127.0.0.1',
    port: 4003,
    path: '/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
    });
    res.on('end', () => {
      let endTime = new Date().getTime()
      allRequest[reqId].endTime = endTime
      allRequest[reqId].status = 'finish'
      allRequest[reqId].usedTime = endTime - allRequest[reqId].startTime
    });
  });
  req.on('error', (e) => {
    // console.log(e)
  });
  req.write(postData);
  req.end();
}