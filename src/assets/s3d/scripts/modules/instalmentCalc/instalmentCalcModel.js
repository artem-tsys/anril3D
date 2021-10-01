import EventEmitter from '../eventEmitter/EventEmitter';

export default class InstalmentCalcModel extends EventEmitter {
  constructor(model, elements) {
    super();
    this.flat = model;
  }

  openHandler() {
    this.emit('openForm');
  }

  renderInstallmentForm() {
    this.emit('renderInstallmentForm', this.flat);
  }

  updateSlides(data) {
    const { price } = +this.flat;
    console.log(price);
    const returnData = {};
    Object.entries(data).forEach(ranges => {
      const [name, dataObject] = ranges;

      console.log(dataObject);
    })
    this.emit('updateSlides');
  }
}
