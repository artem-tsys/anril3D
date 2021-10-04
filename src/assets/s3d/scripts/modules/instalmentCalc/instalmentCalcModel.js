import EventEmitter from '../eventEmitter/EventEmitter';

export default class InstalmentCalcModel extends EventEmitter {
  constructor(model, elements) {
    super();
    this.flat = model;
    this.config = {
      amount: { max: 100, min: 0, start: 1 },
      termin: { max: 60, min: 1, start: 60 },
    };
  }

  initRanges() {
    this.emit('initRanges', this.config);
  }

  openHandler() {
    this.emit('openForm');
  }

  renderInstallmentForm() {
    this.emit('renderInstallmentForm', this.flat);
  }

  updateInstallmentActiveFlat(data) {
    this.emit('updateInstallmentActiveFlat', data);
    // console.log(data, 'NEW DATA');
  }

  updateSlides(data) {
    let { price } = this.flat;
    price = +price.replace(/ /g, '');
    const returnData = {};
    Object.entries(data).forEach(ranges => {
      const [name, dataObject] = ranges;
      switch (name) {
          case 'amount':
            returnData[name] = (price / 100 * dataObject.old_from).toFixed(0) + ' ₴';
            break;
          case 'termin':
            returnData[name] = dataObject.old_from + ' міс.';
            break;
          default:
            returnData[name] = dataObject.old_from;
            break;
      }
    });
    returnData.per_month = ((+price - +returnData.amount.replace(/\D/g, ''))
      / +data.termin.old_from).toFixed(0) + ' ₴';
    this.emit('updateSlides', returnData);
  }
}
