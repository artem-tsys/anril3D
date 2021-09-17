import EventEmitter from '../eventEmitter/EventEmitter';
import CallBackFormView from './callbackFormView';
import CallbackFormModel from './callbackFormModel';


export default class CallbackFormController extends EventEmitter {
  constructor() {
    super();
    this.model = new CallbackFormModel();
    this.view = new CallBackFormView(this.model);
    this.view.on('firstRender', () => {
      this.model.firstRender();
    });
    this.view.on('closeForm', () => {
      this.model.closeHandler();
    });
    this.view.on('openForm', () => {
      this.model.openHandler();
    });
  }
}
