
// sysStartTime: SYS_START_TIME,
// sysEndTime: SYS_END_TIME,
// requestContainer: REQUEST_CONTAINER,
// requestCount: REQUEST_COUNT,
// successRequestCount: SUCCESS_REQUEST_COUNT,
// failRequestCount: FAIL_REQUEST_COUNT
exports.result = (opts) => {
  const { sysStartTime, sysEndTime, requestContainer, requestCount, successRequestCount, failRequestCount } = opts
  console.log("QPS");
  console.log("request count => " + requestCount);
  const usedTime = (sysEndTime - sysStartTime) / 1000;
  console.log(sysEndTime - sysStartTime);
  console.log(requestCount / usedTime);
}
