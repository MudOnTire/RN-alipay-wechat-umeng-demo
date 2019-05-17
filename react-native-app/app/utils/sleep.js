/**
 * sleep
 * created by 熊玮 at 2017/10/21
 */

const sleep = async (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

export default sleep;
