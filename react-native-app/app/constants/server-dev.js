export default {
  // SERVER: 'localhost',
  // SERVER: '172.20.10.6',
  SERVER: '192.168.0.101',

  SERVER_PORT: 5050,
  USE_HTTPS: false,

  get baseUrl() {
    return `${this.USE_HTTPS ? 'https' : 'http'}://${this.SERVER}:${this.SERVER_PORT}`;
  },

  get ADMIN_URL() {
    return `http://${this.SERVER}:8000`;
  },

  get SHARE_URLS() {
    return {
      NEWS: `${this.ADMIN_URL}/#/pages/news-detail`
    }
  }
};
