import EventEmitter from '../eventEmitter/EventEmitter';
import gsap from 'gsap';
import $ from "jquery";
import ionRangeSlider from 'ion-rangeslider';
export default class InstalmentCalcView extends EventEmitter {
  constructor(model, elements) {
    super();
    this.model = model;
    this.init();
    this.model.on('openForm', () => {
      this.open();
    });
    this.model.on('renderInstallmentForm', (data) => {
      console.log(data);
      this.render(data);
    });
    this.model.on('updateSlides', (data) => {
      console.log('DATA FROM INSTALLMODEL');
    });
    this.config = {
      termin: 10,
      amount: 10,
    };
    this.ranges = {};
  }

  close() {
    gsap.to(this.form, { autoAlpha: 0 });
  }

  open() {
    gsap.to(this.form, { autoAlpha: 1 });
  }

  init() {
    // this.render();
  }

  render(flatData) {
    document.querySelector('.s3d-flat__wrap')
      .insertAdjacentHTML('beforeend', this.getLayout(flatData));
    this.form = document.querySelector('.form-instalment-layout');
    this.addCloseButton();
    this.addRanges();
    console.log(this);
  }

  addCloseButton() {
    const el = document.createElement('div');
    el.innerHTML = `
      <svg class="" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.32844 7.501L14.8281 1.00127C15.057 0.772428 15.057 0.401413 14.8281 0.172605C14.5993 -0.0562035 14.2283 -0.0562328 13.9995 0.172605L7.49975 6.67234L1.00004 0.172605C0.771207 -0.0562328 0.400192 -0.0562328 0.171384 0.172605C-0.0574242 0.401442 -0.0574535 0.772457 0.171384 1.00127L6.67109 7.50097L0.171384 14.0007C-0.0574535 14.2295 -0.0574535 14.6006 0.171384 14.8294C0.285788 14.9438 0.435758 15.001 0.585729 15.001C0.735699 15.001 0.885641 14.9438 1.00007 14.8294L7.49975 8.32966L13.9995 14.8294C14.1139 14.9438 14.2638 15.001 14.4138 15.001C14.5638 15.001 14.7137 14.9438 14.8281 14.8294C15.057 14.6005 15.057 14.2295 14.8281 14.0007L8.32844 7.501Z" fill="black"/>
      </svg>
    `;
    el.classList.add('s3d-form__close');
    el.addEventListener('click', () => {
      this.emit('closeForm');
    });
    // this.form.querySelector('form').insertAdjacentElement('afterbegin', el);
  }

  addRanges() {
    const self = this;
    document.querySelectorAll('.form-instalment-layout .js-range-slider')
      .forEach(range => {
        const name = range.getAttribute('name');
        $(range).ionRangeSlider({
          min: 0,
          max: 100,
          from: 100,
          to: 0,
          onFinish: () => {
            self.emit('updateSlides', this.ranges);
          },
        });
        this
          .ranges[name] = $(range).data('ionRangeSlider');
        this.ranges[name].name = name;
      });
  }

  getLayout(flatData) {
    return `
      <div class="form-instalment-layout">
      <form action="" class="form-instalment">
        <div class="form-instalment__title">Калькулятор розстрочки</div>
        <div>
          <div class="form-instalment__subtitle">Загальна вартість</div>
          <div class="fw-600" data-currency="₴">${flatData.price}</div>
        </div>
            <div class="form-instalment__delimiter"></div>
            <div class="tab">Перший внесок</div>
            <div  class="h6" data-first-amount>326,919 грн.</div>
            <input type="text" class="js-range-slider" name="amount" data-for="first-amount" value="" />
            <div class="tab">Термі кредиту, місяців</div>
            <div  class="h6" data-termin>60 міс</div>
            <input type="text" class="js-range-slider" data-for="termin" name="termin" value="" />
            <div class="tab">Щомісячний платіж</div>
            <div class="h4">12,714</div>
            <div class="s3d-form__input-group form-field-input" data-field-input data-field-phone data-status="field--inactive">
              <input class="s3d-form__input form-field__input"  name="name" placeholder="Ім'я">
              <label  class="s3d-form__input-message">Ім'я</label>
              <div class="input-message" data-input-message></div>
              <div class="input-placeholder">Ім'я</div>
            </div>
            <div class="s3d-form__input-group form-field-input" data-field-input data-field-phone data-status="field--inactive">
              <input class="s3d-form__input form-field__input" id="s3d-callback-tel" inputmode="tel" name="phone" placeholder="Телефон">
              <label  class="s3d-form__input-message">Телефон</label>
              <div class="input-message" data-input-message></div>
              <div class="input-placeholder">Ваш телефон</div>
            </div>
            <button class="form-instalment__submit" type="submit">Замовити розстрочку</button>
            <button class="form-instalment__pdf" type="button">Завантажити PDF з графіком виплат</button>
          </div>
      </form>
    </div>
    `;
  }
}
