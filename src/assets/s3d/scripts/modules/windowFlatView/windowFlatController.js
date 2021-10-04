import EventEmitter from '../eventEmitter/EventEmitter';
import WindowFlatView from './windowFlatView';
import WindowFlatModel from './windowFlatModel';

export default class WindowFlatController extends EventEmitter {
  constructor() {
    super();
    this.model = new WindowFlatModel();
    this.view = new WindowFlatView(this.model);
    this.on('renderWindowViewForm', event => {
      this.model.renderWindowViewForm();
    });
  }
}
