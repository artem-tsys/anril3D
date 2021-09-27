import EventEmitter from '../eventEmitter/EventEmitter';
import InstalmentCalcView from './instalmentCalcView';
import InstalmentCalcModel from './instalmentCalcModel';

export default class InstalmentCalcController extends EventEmitter {
  constructor() {
    super();
    this.model = new InstalmentCalcModel();
    this.view = new InstalmentCalcView(this.model);
    this.view.on('openForm', () => {
      this.model.openHandler();
    });
  }
}
