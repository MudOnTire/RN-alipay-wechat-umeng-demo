import { observable } from 'mobx';

class LoadingService {
  @observable show = false;
  @observable title = '加载中...';
  @observable animating = false;
  _currentLoading: null;

  registerLoading(loading) {
    this._currentLoading = loading;
  }

  unregisterLoading() {
    this._currentLoading = null;
  }

  /**
   * 显示loading
   * @param title
   */
  showLoading(title = '加载中...') {
    if (this._currentLoading === null) {
      return;
    }
    this.title = title;
    this.animating = true;
    this.show = true;
    this._currentLoading.show().done(() => {
      this.animating = false;
    });
  }

  /**
   * 隐藏loading
   */
  hideLoading(onHide) {
    if (this._currentLoading === null) {
      return;
    }
    const doHide = () => {
      this.animating = true;
      this._currentLoading.hide().done(() => {
        this.animating = false;
        this.show = false;
        onHide && onHide();
      });
    };
    if (this.animating) {
      setTimeout(doHide, 300);
    } else {
      doHide();
    }
  }
}

export default new LoadingService();
