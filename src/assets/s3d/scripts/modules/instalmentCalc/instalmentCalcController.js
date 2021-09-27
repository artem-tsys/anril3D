import EventEmitter from '../eventEmitter/EventEmitter';
import InstalmentCalcView from './instalmentCalcView';
import InstalmentCalcModel from './instalmentCalcModel';

export default class instalmentCalcController extends EventEmitter {
  constructor() {
    super();
    this.model = new InstalmentCalcModel();
    this.view = new InstalmentCalcView(this.model);
  }
}
