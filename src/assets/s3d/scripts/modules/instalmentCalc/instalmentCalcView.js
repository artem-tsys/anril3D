import EventEmitter from '../eventEmitter/EventEmitter';

export default class InstalmentCalcView extends EventEmitter {
  constructor(model, elements) {
    super();
    this.model = model;
  }

  getLayout() {
    return `
      <div class="form-instalment-layout">
      <form action="" class="form-instalment">
        <div class="form-instalment__title">Калькулятор розстрочки</div>
        <div class="form-instalment__subtitle">Загальна вартість
            <div class="fw-600" data-currency="₴">1089730</div>
            <div class="form-instalment__delimiter"></div>
            <div class="form-instalment__input-group">
                <input type="text">
            </div>
            <div class="form-instalment__input-group">
                <input type="text">
            </div>
            <button type="submit">Замовити розстрочку</button>
            <button type="button">Завантажити PDF з графіком виплат</button>
          </div>
      </form>
    </div>
    `;
  }
}
