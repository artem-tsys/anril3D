export default class CallBackFormView {
  constructor(data) {
    this.data = data;
  }
  render() {
    document.body.insertAdjacentHTML('beforeend', this.init());
  }

  init() {
    return `
        <form class="s3d-form" >
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
