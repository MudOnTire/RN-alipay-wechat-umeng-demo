export default {
  SERVER: 'specialspeaker.applinzi.com',
  USE_HTTPS: false,
  get baseUrl() {
    return `${this.USE_HTTPS ? 'https' : 'http'}://${this.SERVER}`;
  },

  get ADMIN_URL() {
    return `https://${this.SERVER}`
  },

  get SHARE_URLS() {
    return {
      NEWS: `${this.ADMIN_URL}/#/pages/news-detail`,
      POST: `${this.ADMIN_URL}/#/pages/post-detail`
    }
  }
};
