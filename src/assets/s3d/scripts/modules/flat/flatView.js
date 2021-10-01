import $ from 'jquery';
import i18next from 'i18next';
import EventEmitter from '../eventEmitter/EventEmitter';

class FlatView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;

    // model.wrapper.on('click', '.js-s3d-flat__back', e => {
    //   this.emit('clickBackHandler', e)
    // })
    model.wrapper.on('click', '.appart__hover', event => {
      this.emit('clickFlatHandler', event);
    });

    // events handler form start
    model.wrapper.on('click', '.js-callback-form', e => {
      e.preventDefault();
      $('.js-phone-order-popup').addClass('active');
      this.emit('openForm');
    });
    model.wrapper.on('click', '.js-installment-form', e => {
      e.preventDefault();
      // $('.js-phone-order-popup').addClass('active');
      this.emit('openInstallmentForm');
    });

    model.wrapper.on('click', '.close-btn', e => {
      e.preventDefault();
      $('.js-phone-order-popup').removeClass('active');
    });
    // events handler form end

    model.wrapper.on('click', '.js-s3d__show-3d', () => {
      this.emit('flatReturnHandler');
      // this.updateFsm('complex', 'search', this.activeFlat)
    });

    model.wrapper.on('click', '.js-s3d__create-pdf', event => {
      event.preventDefault();
      this.emit('clickPdfHandler', event);
    });

    model.wrapper.on('change', '.js-s3d__radio-type', el => {
      this.emit('changeRadioType', el);
    });

    model.wrapper.on('mouseleave', '.appart__hover', el => {
      this.emit('updateHoverDataFlat', this._model.getFlat(this._model.activeFlat));
    });

    model.wrapper.on('mouseenter', '.appart__hover', el => {
      this.emit('updateHoverDataFlat', el);
    });

    model.wrapper.on('change', '.js-s3d__radio-view', el => {
      this.emit('changeRadioView', el);
      // this.setNewImage(this.getFlat(this.activeFlat).images)
    });

    model.wrapper.on('click', '.js-s3d__radio-view-change', el => {
      if (el.target.localName !== 'input') {
        return;
      }
      this.emit('changeRadioChecked', el);
    });

    model.on('setHtml', html => { 
      this.setHtml(html);
      this.emit('renderInstallmentForm');
    });
    model.on('updateFlatData', data => { 
      this.updateFlatData(data);
      console.log(data, 'FLAT DATA');
    });
    model.on('removeElement', tag => { this.removeElement(tag); });
    model.on('changeClassShow', elem => { this.changeClassShow(elem); });
    model.on('updateImg', data => { this.setNewImage(data); });
    model.on('createRadioElement', data => { this.createRadio(data); });
    model.on('clearRadioElement', wrap => { this.clearRadio(wrap); });
    model.on('showViewButton', flag => { this.showViewButton(flag); });
    model.on('updateDataFlats', data => { this.updateHoverFlats(data); });
  }

  setHtml(content) {
    $(this._model.wrapper).html(content);
    // $(this._model.wrapper).html(this.getGradient());
    /* Вставка градиента в план этажа для ховера */
    $(this._model.wrapper)[0].querySelector('.appart__hover')
      .insertAdjacentHTML('beforebegin', this.getGradient());
  }

  getGradient() {
    return `
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="gradient-fill" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1f005c"/>
            <stop offset="10%" stop-color="#5b0060"/>
            <stop offset="28%" stop-color="#870160"/>
            <stop offset="42%" stop-color="#ac255e"/>
            <stop offset="57%" stop-color="#ca485c"/>
            <stop offset="71%" stop-color="#e16b5c"/>
            <stop offset="85%" stop-color="#f39060"/>
            <stop offset="100%" stop-color="#ffb56b"/>
        </linearGradient>
    `;
  }

  updateFlatData(data) {
    const {
      flat, id,
    } = data;
    this.emit('updateInstallmentActiveFlat', data);
    console.log('NEW FLAT TEMPLATE');
    const wrap = $('.js-s3d__wrapper__flat');
    const pdfContainer = wrap.find('.js-s3d__create-pdf')[0];
    wrap.find('.js-s3d-flat__image')[0].src = flat.img;
    wrap.find('.js-s3d-flat__image')[0].dataset.mfpSrc = flat.img;
    wrap.find('.js-s3d-flat__card').html(flat['leftBlock']);
    wrap.find('.js-s3d-add__favourites')[0].dataset.id = id;
    $('polygon.u-svg-plan--active').removeClass('u-svg-plan--active');
    wrap.find(`.s3d-flat__floor [data-id=${id}]`).addClass('u-svg-plan--active');
    pdfContainer.dataset.id = id;
    if (flat && flat.pdf) {
      pdfContainer.style.display = '';
      pdfContainer.href = flat.pdf;
    } else {
      pdfContainer.style.display = 'none';
    }
  }

  changeClassShow(config) {
    const { element, flag } = config;

    if (flag) {
      $(element).addClass('show');
    } else {
      $(element).removeClass('show');
    }
  }

  changeClassHide(element) {
    $(element).removeClass('show');
  }

  removeElement(tag) {
    $(tag).remove();
  }

  showViewButton(flag) {
    if (flag) {
      $('.js-s3d-flat__buttons-view').addClass('show');
    } else {
      $('.js-s3d-flat__buttons-view').removeClass('show');
    }
  }

  createRadio(data) {
    const {
      wrap, type, name,
    } = data;
    $(wrap).append(`<label class="s3d-flat__button js-s3d__radio-${name}" data-type=${type} >
      <input type="radio" name=${name} class="s3d-flat__button-input" value=${type} />
    <span>${i18next.t(`flat.buttons.${type}`)}</span></label>`);
  }

  clearRadio(wrap) {
    $(wrap).html('');
  }

  setNewImage(url) {
    $('.js-s3d-flat__image')[0].src = defaultProjectPath + url;
    $('.js-s3d-flat__image')[0].dataset['mfpSrc'] = defaultProjectPath + url;
  }

  updateHoverFlats(data) {
    $('.js-s3d__wrapper__flat [data-type="type"]').html(data['type']);
    $('.js-s3d__wrapper__flat [data-type="flat"]').html(data['rooms']);
    $('.js-s3d__wrapper__flat [data-type="area"]').html(data['area']);
  }
}

export default FlatView;
