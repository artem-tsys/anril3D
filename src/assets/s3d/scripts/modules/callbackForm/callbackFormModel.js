import EventEmitter from '../eventEmitter/EventEmitter';

export default class CallbackFormModel extends EventEmitter {
  constructor() {
    super();
  }

  closeHandler() {
    this.emit('closeForm');
  }

  firstRender() {
    this.emit('firstRender');
    console.log('firstFormRender');
  }

  openHandler() {
    this.emit('openForm');
  }
}
