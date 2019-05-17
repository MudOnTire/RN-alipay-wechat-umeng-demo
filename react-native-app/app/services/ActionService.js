import { observable } from 'mobx';

class ActionService {
  @observable currentScene = 'splash';
}

export default new ActionService();
