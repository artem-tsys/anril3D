import $ from 'jquery';
import EventEmitter from '../eventEmitter/EventEmitter';

class AppView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;

    elements.switch.on('click', event => {
      if (event.target.classList.contains('active') || event.target.hasAttribute('disabled')) {
        return;
      }
      this.emit('chooseSlider', event);
      this.changeActiveButton(event.target);
    });

    elements.wrapper.on('click', '.js-s3d-ctr__back', e => {
      this.emit('clickBackHandler', e);
    });

    elements.selected.on('click', e => {
      const type = e.target.dataset.selectedType;
      this.emit('changeSelectedHandler', type);
      this.changeSelected(type);
    });

    elements.wrapper.on('click', '.js-s3d-ctr__toHome', e => {
      this.emit('clickToHomeHandler', e);
    });

    $(window).resize(() => {
      this.emit('resize');
    });
    this.changeSelected(this._model.$typeSelectedFlyby.value);
    model.on('createWrapper', a => { this.createWrap(a); });
    model.on('changeBlockActive', a => { this.changeBlockIndex(a); });
    model.on('changeClass', a => { this.changeClass(a); });
    model.on('animateChangeBlock', () => { this.animateBlock(); });
    model.on('updateCompassRotate', e => { this.updateCompass(e); });
  }

  showAvailableFlat(flag) {
    if (flag) {
      $('.js-s3d-svg__point-group').css({ opacity: '1', display: 'flex' });
    } else {
      $('.js-s3d-svg__point-group').css({ opacity: '0', display: 'none' });
    }
  }

  changeSelected(type) {
    document.querySelectorAll('[data-selected-type]')
      .forEach(button => {
        if (button.dataset.selectedType === type) {
          button.classList.add('active');
          return;
        }
        button.classList.remove('active');
      });
  }

  checkAvailableFlat() {
    const input = $('.js-s3d-ctr__showFilter--input');
    const checked = input.prop('checked');
    input.prop('checked', checked);
    this.showAvailableFlat(!checked);
  }

  createWrap(conf) {
    // все 3 обертки нужны, без них на мобилке пропадает прокрутка и всё ломается
    const wrap1 = createMarkup('div', { class: `s3d__wrap js-s3d__wrapper__${conf.id} s3d__wrapper__${conf.type}` });
    const wrap2 = createMarkup('div', { class: 'js-s3d__wrapper__canvas', style: 'position:relative;' });
    const wrap3 = createMarkup(conf.typeCreateBlock, { id: `js-s3d__${conf.id}` });
    $(conf.generalWrapId).append(wrap1);
    wrap1.append(wrap2);
    wrap2.append(wrap3);
  }

  changeBlockIndex(name) {
    $('.s3d__wrap').css('z-index', '');
    $(`.js-s3d__wrapper__${name}`).css('z-index', '100');
    $('.js-s3d-ctr')[0].dataset.type = name;
    $('.js-s3d-filter')[0].dataset.type = name;
    $('.js-s3d-filter').removeClass('s3d-filter__scroll-active');
    this.changeActiveButton(name);
  }

  changeActiveButton(name) {
    $('.js-s3d__select.active').removeClass('active');
    if (name === 'flyby' || name === 'plannings' || name === 'flat' || name === 'favourites' || name === 'floor') {
      $(`.js-s3d__select[data-type=${name}]`).addClass('active');
    } else {
      const { type, flyby, side } = this._model.fsm.settings;
      $(`.js-s3d__select[data-type=${type}][data-flyby=${flyby}][data-side=${side}]`).addClass('active');
    }
  }

  changeClass(conf) {
    const status = conf.flag ? 'add' : 'remove';
    const elem = document.querySelector(conf.target);
    if (elem) {
      elem.classList[status](conf.changeClass);
    }
  }

  animateBlock() {
    const layers = document.querySelectorAll('.translate-layer');
    layers[0].classList.remove('translate-layer__down', 'translate-layer__up', 'active');
    layers[0].classList.add('translate-layer__down');
    setTimeout(() => layers[0].classList.add('active'), 100);
  }

  updateCompass(deg) {
    $('.s3d-ctr__compass svg').css('transform', `rotate(-${deg}deg)`);
  }
}

export default AppView;
