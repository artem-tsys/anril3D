import gsap from 'gsap';
import * as yup from 'yup';
import i18next from 'i18next';
import EventEmitter from '../eventEmitter/EventEmitter';
import FormMonster from '../form/form';
import SexyInput from '../form/input/input';

export default class CallBackFormView extends EventEmitter {
  constructor(data) {
    super();
    this.model = data;
    this.data = data;

    this.init();
  }

  render() {
    document.body.insertAdjacentHTML('beforeend', this.getView());
    this.form = document.querySelector('.s3d-form');
    this.addCloseButton();
  }

  close() {
    gsap.to(this.form, { autoAlpha: 0 });
  }

  open() {
    gsap.to(this.form, { autoAlpha: 1 });
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
    this.form.insertAdjacentElement('afterbegin', el);
  }

  getView() {
    return `
        <form class="s3d-form">
            <div class="s3d-form__title">Наш менеджер зв’яжеться з Вами у зручний час</div>
            <div class="s3d-form__input-group form-field-input" data-field-input data-field-name data-status="field--inactive">
              <input id="s3d-callback-name form-field__input" type="text" name="name" class="s3d-form__input" placeholder="Ім'я">
              <label for="s3d-callback-name" class="s3d-form__input-message">Ім'я</label>
              <div class="input-message" data-input-message></div>
              <div class="input-placeholder">Ваш телефон</div>
            </div>
            <div class="s3d-form__input-group form-field-input" data-field-input data-field-phone data-status="field--inactive">
              <input class="s3d-form__input form-field__input" id="s3d-callback-tel" inputmode="tel" name="phone" placeholder="Телефон">
              <label  class="s3d-form__input-message">Телефон</label>
              <div class="input-message" data-input-message></div>
              <div class="input-placeholder">Ваш телефон</div>
              
            </div>
            <div class="s3d-form__input-group s3d-form__checkbox-group">
                <input id="s3d-callback-tel-now" name="date" type="radio" value="now" class="s3d-form__checkbox">
                <label for="s3d-callback-tel-now" class="s3d-form__checkbox-label">Зателефонуйте зараз</label>
            </div>
            <div class="s3d-form__input-group s3d-form__checkbox-group">
              <input id="s3d-callback-tel-date" data-trigger-for="wanted-date" value="individual" name="date" type="radio" class="s3d-form__checkbox">
              <label for="s3d-callback-tel-date" class="s3d-form__checkbox-label">Вказати час</label>
              <input class="s3d-form__input s3d-form__checkbox-input" autocomplete="off" name="wanted-date">
            </div>
            <div class="s3d-form__subtitle">* Поля обов’язкові для заповнення</div>
            <div class="form-btn-wrap">
            </div>
            <button class="s3d-form__submit" data-btn-submit="data-btn-submit" type="submit">
              Відправити
              <div data-btn-submit-text></div>
            </button>
            
            
        </div>
        ${this.addToster()}
    `;
  }

  addToster() {
    return '<div class="toast-wrapper" data-toast-wrapper></div>';
  }

  setoutsideClickClose() {
    window.addEventListener('click', evt => {
      if (evt.target.closest('.s3d-form') === null
      && evt.target.closest('.js-callback-form') === null) this.close();
    });
  }

  setEmmits() {
    this.model.on('closeForm', () => {
      this.close();
    });
    this.model.on('openForm', () => {
      this.open();
    });
    this.model.on('firstRender', () => {
      this.render();
    });
    window.addEventListener('click', () => {
      // if (evt.target.classList.contains('js-callback-form')) {
      //   this.emit('openForm');
      // }
    });
  }

  init() {
    this.render();
    this.setEmmits();
    // this.setoutsideClickClose();
    this.initHandlers();
    this.handleDatePicker();
  }

  handleDatePicker() {
    const triggerForClearCalendar = document
      .querySelector('[data-trigger-for="wanted-date"]');
    this.datePicker = jQuery('[name="wanted-date"]')
      .datetimepicker({});
    jQuery('[name="date"]').on('change', false, () => {
      if (!triggerForClearCalendar.checked) {
        jQuery('[name="wanted-date"]').val('');
      }
    });
  }

  initHandlers() {
    const self = this;
    // eslint-disable-next-line no-new
    this.handler = new FormMonster({
      /* eslint-enable */
      succesEventName: 'succesSend',
      elements: {
        $form: self.form,
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
