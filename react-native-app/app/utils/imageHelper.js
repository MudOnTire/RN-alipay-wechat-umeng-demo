const cname = 'eichimages.applinzi.com';
const initalCmd = '/q_100/';

export default {
  convertAvatar: (orginalUrl) => {
    if (orginalUrl && orginalUrl.indexOf(cname)) {
      return orginalUrl.replace(initalCmd, '/w_300,q_80/');
    } else {
      return orginalUrl;
    }
  }
}