import EventEmitter from '../eventEmitter/EventEmitter';
import gsap from 'gsap';
import $ from "jquery";
import ionRangeSlider from 'ion-rangeslider';
import * as yup from 'yup';
import i18next from 'i18next';
import FormMonster from '../form/form';
import SexyInput from '../form/input/input';
import { langDetect } from '../form/helpers/helpers';

export default class InstalmentCalcView extends EventEmitter {
  constructor(model, elements) {
    super();
    this.model = model;
    this.init();
    this.model.on('openForm', () => {
      this.open();
    });
    this.model.on('renderInstallmentForm', (data) => {
      this.render(data);
    });
    this.model.on('updateSlides', (data) => {
      Object.entries(data).forEach(dataItem => {
        const [name, value] = dataItem;
        const $el = document.querySelector(`[data-${name}]`);
        $el.textContent = this.numberWithCommas(value);
      });
    });
    this.model.on('initRanges', (data) => {
      this.addRanges(data);
    });

    this.model.on('updateInstallmentActiveFlat', (data) => {
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

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  render(flatData) {
    document.querySelector('.s3d-flat__wrap')
      .insertAdjacentHTML('beforeend', this.getLayout(flatData));
    this.form = document.querySelector('.form-instalment-layout');
    this.addCloseButton();
    this.emit('initRanges');
    this.initHandlers();
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

  addRanges(data) {
    const self = this;
    Object.entries(data).forEach(rangeArg => {
      const [name, value] = rangeArg;
      const range = document.querySelector(`.js-range-slider[name="${name}"]`);
      $(range).ionRangeSlider({
        min: value.min,
        max: value.max,
        from: value.start,
        to: 0,
        onChange: () => {
          self.emit('updateSlides', this.ranges);
        },
      });
      this
        .ranges[name] = $(range).data('ionRangeSlider');

      this
        .ranges[name].update({
          from: 0,
        });
      this.ranges[name].name = name;
    });
    // document.querySelectorAll('.form-instalment-layout .js-range-slider')
    //   .forEach(range => {
    //     const name = range.getAttribute('name');
    //     $(range).ionRangeSlider({
    //       min: 1,
    //       max: 100,
    //       from: 100,
    //       to: 0,
    //       onFinish: () => {
    //         self.emit('updateSlides', this.ranges);
    //       },
    //     });
    //     this
    //       .ranges[name] = $(range).data('ionRangeSlider');
    //     this.ranges[name].name = name;
    //   });
  }

  getLayout(flatData) {
    return `
      <div class="form-instalment-layout">
      <form action="" class="form-instalment">
        <div class="form-instalment__title">Калькулятор розтермінування</div>
        <div class="form-instalment__top-group">
          <div class="form-instalment__subtitle">Загальна вартість</div>
          <div class="fw-600" data-currency="₴">${flatData.price}</div>
        </div>
          <div class="form-instalment__delimiter"></div>
          <div class="form-instalment__range-group">
            <div class="form-instalment__range-group-top">
              <div class="tab">Перший внесок, ₴</div>
              <div  class="h6" data-amount>326,919 грн.</div>
            </div>
            <input type="text" class="js-range-slider" name="amount" data-for="amount" value="" />
          </div>
          <div class="form-instalment__range-group">
            <div class="form-instalment__range-group-top">
              <div class="tab">Період розтермінування, місяців</div>
              <div  class="h6" data-termin>60 міс</div>
            </div>
            <input type="text" class="js-range-slider" data-for="termin" name="termin" value="" />
          </div>
          <div class="fdc form-instalment__section">
          <div class="s3d-form__input-group form-field-input" data-field-input data-field-name data-status="field--inactive">
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
          </div>
          <div class="fdc form-instalment__small-group">
            <div class="tab">Щомісячний платіж</div>
            <div class="h4" data-per_month data-currency="₴">12,714</div>
          </div>
          <button class="form-instalment__pdf" type="button">
          Завантажити PDF з графіком виплат
          </button>
          <button class="form-instalment__submit" data-btn-submit type="submit">
          Замовити розстрочку
          <div data-btn-submit-text></div>
          </button>
          </div>
      </form>
    </div>
    `;
  }

  initHandlers() {
    const self = this;
    // eslint-disable-next-line no-new
    this.handler = new FormMonster({
      /* eslint-enable */
      succesEventName: 'succesSend',
      elements: {
        $form: self.form.querySelector('form'),
        showSuccessMessage: true,
        $btnSubmit: self.form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: self.form.querySelector('[data-field-name]'),
            }),
            rule: yup.string().required(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: self.form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });
  }
}
