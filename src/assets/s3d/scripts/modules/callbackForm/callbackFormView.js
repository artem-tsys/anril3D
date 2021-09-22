import gsap from 'gsap';
import * as yup from 'yup';
import i18next from 'i18next';
import EventEmitter from '../eventEmitter/EventEmitter';
import FormMonster from '../form/form';
import SexyInput from '../form/input/input';
import { langDetect } from '../form/helpers/helpers';

export default class CallBackFormView extends EventEmitter {
  constructor(data) {
    super();
    this.model = data;
    this.data = data;

    this.init();
  }

  render() {
    document.body.insertAdjacentHTML('beforeend', this.getView());
    this.form = document.querySelector('.s3d-form__overlay');
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
    this.form.querySelector('form').insertAdjacentElement('afterbegin', el);
  }

  getView() {
    return `
    <div class="s3d-form__overlay">
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
              <div class="s3d-form__checkbox-input-wrap">
                <input class="s3d-form__input s3d-form__checkbox-input" autocomplete="off" name="wanted-date" placeholder="Вказати зручний час">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="#AF989C" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 10.5C4.08579 10.5 3.75 10.8358 3.75 11.25C3.75 11.6642 4.08579 12 4.5 12H10.5C10.9142 12 11.25 11.6642 11.25 11.25C11.25 10.8358 10.9142 10.5 10.5 10.5H4.5Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 0C10.0858 0 9.75 0.335787 9.75 0.75V1.5H5.25V0.75C5.25 0.335786 4.91421 0 4.5 0C4.08579 0 3.75 0.335787 3.75 0.75V1.5H3C1.34315 1.5 0 2.84315 0 4.5V12C0 13.6569 1.34315 15 3 15H12C13.6569 15 15 13.6569 15 12V4.5C15 2.84315 13.6569 1.5 12 1.5H11.25V0.75C11.25 0.335786 10.9142 0 10.5 0ZM3.75 3.75V3H3C2.17157 3 1.5 3.67157 1.5 4.5V12C1.5 12.8284 2.17157 13.5 3 13.5H12C12.8284 13.5 13.5 12.8284 13.5 12V4.5C13.5 3.67157 12.8284 3 12 3H11.25V3.75C11.25 4.16421 10.9142 4.5 10.5 4.5C10.0858 4.5 9.75 4.16421 9.75 3.75V3H5.25V3.75C5.25 4.16421 4.91421 4.5 4.5 4.5C4.08579 4.5 3.75 4.16421 3.75 3.75Z"/>
                  </svg>
              </div>
            </div>
            <div class="s3d-form__submit-group">
              <div class="form-btn-wrap"></div>
              <div class="s3d-form__subtitle">* Поля обов’язкові для заповнення</div>
              <button class="s3d-form__submit" data-btn-submit="data-btn-submit" type="submit">
                Відправити
                <div data-btn-submit-text></div>
              </button>
            </div>
            
            
        </div>
      </div>
        ${this.addToster()}
    `;
  }

  addToster() {
    return '<div class="toast-wrapper" data-toast-wrapper></div>';
  }

  setoutsideClickClose() {
    window.addEventListener('click', evt => {
      if (evt.target.classList.contains('s3d-form__overlay')) this.close();
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
  }

  init() {
    this.render();
    this.setEmmits();
    this.setoutsideClickClose();
    this.initHandlers();
    this.handleDatePicker();
  }

  handleDatePicker() {
    jQuery.datetimepicker.setLocale(langDetect());
    const triggerForClearCalendar = document
      .querySelector('[data-trigger-for="wanted-date"]');
    this.datePicker = jQuery('[name="wanted-date"]')
      .datetimepicker({
        minDate: new Date(),
        lazyInit: true,
      });
      jQuery('[name="wanted-date"]')
      .datetimepicker('show');
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
