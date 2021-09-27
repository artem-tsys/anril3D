import EventEmitter from '../eventEmitter/EventEmitter';

export default class InstalmentCalcModel extends EventEmitter {
  constructor(model, elements) {
    super();
  }

  openHandler() {
    this.emit('openForm');
  }
}
