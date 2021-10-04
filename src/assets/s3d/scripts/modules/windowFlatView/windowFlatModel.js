import EventEmitter from '../eventEmitter/EventEmitter';

export default class InstalmentCalcModel extends EventEmitter {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  getAjax(url) {
    return fetch(url);
  }

  renderWindowViewForm() {
    this.getAjax('./static/window-view.json')
      .then(res => res.json())
      .then(res => this.emit('renderWindowViewForm', res))
      .catch(err => console.log(err));
  }
}
