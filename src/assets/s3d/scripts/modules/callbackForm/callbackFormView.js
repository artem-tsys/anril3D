import gsap from "gsap";
import EventEmitter from '../eventEmitter/EventEmitter';

export default class CallBackFormView extends EventEmitter {
  constructor(data) {
    super();
    this.data = data;
  }

  render() {
    document.body.insertAdjacentHTML('beforeend', this.getView());
    this.form = document.querySelector('.s3d-form');
  }

  close() {
    gsap.to(this.form, { autoAlpha: 0 });
  }

  open() {
    gsap.to(this.form, { autoAlpha: 1 });
  }

  getView() {
    return `
        <form class="s3d-form" >
            <svg class="s3d-form__close" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.32844 7.501L14.8281 1.00127C15.057 0.772428 15.057 0.401413 14.8281 0.172605C14.5993 -0.0562035 14.2283 -0.0562328 13.9995 0.172605L7.49975 6.67234L1.00004 0.172605C0.771207 -0.0562328 0.400192 -0.0562328 0.171384 0.172605C-0.0574242 0.401442 -0.0574535 0.772457 0.171384 1.00127L6.67109 7.50097L0.171384 14.0007C-0.0574535 14.2295 -0.0574535 14.6006 0.171384 14.8294C0.285788 14.9438 0.435758 15.001 0.585729 15.001C0.735699 15.001 0.885641 14.9438 1.00007 14.8294L7.49975 8.32966L13.9995 14.8294C14.1139 14.9438 14.2638 15.001 14.4138 15.001C14.5638 15.001 14.7137 14.9438 14.8281 14.8294C15.057 14.6005 15.057 14.2295 14.8281 14.0007L8.32844 7.501Z" fill="black"/>
            </svg>
            <div class="s3d-form__title">Наш менеджер зв’яжеться з Вами у зручний час</div>
            <div class="s3d-form__input-group">
            <input id="s3d-callback-name" class="s3d-form__input" placeholder="Ім'я">
            <label for="s3d-callback-name" class="s3d-form__input-message">Ім'я</label>
            </div>
            <div class="s3d-form__input-group">
            <input class="s3d-form__input" id="s3d-callback-tel" placeholder="Телефон">
            <label  class="s3d-form__input-message">Телефон</label>
            </div>
            <div class="s3d-form__input-group s3d-form__checkbox-group">
                <input id="s3d-callback-tel-now" name="date" type="radio" class="s3d-form__checkbox">
                <label for="s3d-callback-tel-now" class="s3d-form__checkbox-label">Зателефонуйте зараз</label>
            </div>
            <div class="s3d-form__input-group s3d-form__checkbox-group">
              <input id="s3d-callback-tel-date" name="date" type="radio" class="s3d-form__checkbox">
              <label for="s3d-callback-tel-date" class="s3d-form__checkbox-label">Вказати час</label>
              <input class="s3d-form__input s3d-form__checkbox-input">
            </div>
            <div class="s3d-form__subtitle">* Поля обов’язкові для заповнення</div>
            <button class="s3d-form__submit" type="submit">Відправити</button>
  
            
        </form>
    `;
  }
}
