const moment = require('moment');
const Crypto = require('crypto-js');

// const hotlinkingKey = 'YB5psQAvTnzKwfmFMyN3'; // 测试
const hotlinkingKey = 'gdyAeLOBTydNclBXT3AE'; // 生产

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getRandomStr(length) {
  const chars = '1234567890abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomIntInclusive(0, chars.length - 1);
    result += chars[randomIndex];
  }
  return result;
}

/**
 * 生成key防盗链视频url
 * @param {视频原始url} orginalUrl
 * @param {链接失效时间戳，16进制} invalidTimestamp 
 * @param {试看时长，单位s} previewSeconds 
 * @param {最多允许多少IP播放} maxViewer 
 * @param {链接标识，一个随机字符串} uniqueSign 
 */
function getHotlinkingPreventUrl(orginalUrl, invalidTimestamp, isPreview = false, maxViewer = 5, uniqueSign) {
  const dirPattern = /.+\.com(.+\/).+\.mp4/;
  const match = orginalUrl.match(dirPattern);
  if (match) {
    const dir = match[1];
    let previewSeconds = 120;
    if (!invalidTimestamp) {
      invalidTimestamp = moment().add(24, 'hours').unix().toString(16);
    }
    if (!isPreview) {
      previewSeconds = '';
    } else {

    }

    previewSeconds = '';


    if (!uniqueSign) {
      uniqueSign = getRandomStr(10);
    }
    const sign = Crypto.MD5(`${hotlinkingKey}${dir}${invalidTimestamp}${previewSeconds}${uniqueSign}`);
    const resultUrl = `${orginalUrl}?t=${invalidTimestamp}&exper=${previewSeconds}&us=${uniqueSign}&sign=${sign}`;

    console.log(dir);
    console.log(invalidTimestamp);
    console.log(previewSeconds);
    // console.log(maxViewer);
    console.log(uniqueSign);
    console.log(sign);
    console.log(resultUrl);
    return resultUrl;
  } else {
    const error = new Error();
    error.message = '视频原始url错误';
    throw error;
  }
}

export default { getHotlinkingPreventUrl };