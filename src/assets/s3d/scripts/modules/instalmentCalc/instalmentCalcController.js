import EventEmitter from '../eventEmitter/EventEmitter';
import InstalmentCalcView from './instalmentCalcView';
import InstalmentCalcModel from './instalmentCalcModel';

export default class InstalmentCalcController extends EventEmitter {
  constructor(flat) {
    super();
    this.model = new InstalmentCalcModel(flat);
    this.view = new InstalmentCalcView(this.model);
    this.view.on('openForm', () => {
      this.model.openHandler();
    });
    this.view.on('renderInstallmentForm', (data) => {
      this.model.renderInstallmentForm(data);
    });
    this.view.on('updateSlides', (data) => {
      this.model.updateSlides(data);
    });
  }
}
