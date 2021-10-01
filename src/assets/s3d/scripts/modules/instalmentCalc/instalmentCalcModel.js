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
    let { price } = this.flat;
    price = +price.replace(/ /g, '');
    const returnData = {};
    Object.entries(data).forEach(ranges => {
      const [name, dataObject] = ranges;
      switch (name) {
          case 'amount':
            returnData[name] = (price / 100 * dataObject.old_from).toFixed(0);
            break;
          case 'termin':
            break;
          default:
            returnData[name] = dataObject.old_from;
            break;
      }
    });
    returnData.per_month = ((+price - returnData.amount)
      / +data.termin.old_from).toFixed(0) + ' ₴';
    this.emit('updateSlides', returnData);
  }
}
