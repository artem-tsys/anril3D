import $ from 'jquery';
import EventEmitter from '../eventEmitter/EventEmitter';
import Svg from '../Svg';

class SliderView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;

    this.wrapper = $(elements.wrapper);

    // attach model listeners
    model.on('hideActiveSvg', () => { this.hideActiveSvg(); });
    model.on('showActiveSvg', () => { this.showActiveSvg(); });
    model.on('changeSvgActive', svg => { this.updateSvgActive(svg); });
    model.on('changeFlatActive', svg => { this.updateFlatActive(svg); });
    model.on('removeSvgFlatActive', () => { this.removeSvgFlatActive(); });
    model.on('updateLoaderProgress', amount => { this.updatePreloaderPercent(amount); });
    model.on('progressBarHide', () => { this.progressBarHide(); });

    model.on('createSvg', config => { this.createSvg(config); });
    model.on('changeSvg', (config, type) => { this.changeSvg(config, type); });
    model.on('createBackground', () => { this.createBackground(); });
    model.on('createArrow', () => { this.createArrow(); });

    // attach listeners to HTML controls
    this.wrapper.on('mousedown', event => {
      this.emit('mouseKeyDown', event);
    });
    this.wrapper.on('mousemove', elements.wrapperEvent, event => {
      this.emit('mouseMove', event);
    });
    this.wrapper.on('mouseup mouseleave', event => {
      this.emit('mouseKeyUp', event);
    });
    this.wrapper.on('click touch', 'polygon', event => {
      this.emit('touchPolygon', event);
    });
    window.addEventListener('keydown', event => {
      this.emit('keyPress', event);
    });
  }

  hideActiveSvg() {
    this._model.getSvgActive().css({ opacity: 0 });
  }

  showActiveSvg() {
    this._model.getSvgActive().css({ opacity: 1 });
  }

  updateSvgActive(svg) {
    this._model.wrapper.find('.s3d__svg__active').removeClass('s3d__svg__active');
    svg.addClass('s3d__svg__active');
  }

  updateFlatActive(id) {
    this.removeSvgFlatActive();
    $(`.js-s3d__svgWrap [data-id=${id}]`).addClass('active-flat');
  }

  removeSvgFlatActive() {
    $('.js-s3d__svgWrap .active-flat').removeClass('active-flat');
  }

  updatePreloaderPercent(percent) {
    $('.fs-preloader-amount').html(Math.ceil(percent));
  }

  progressBarHide() {
    $('.fs-preloader').removeClass('preloader-active');
  }

  // инициализация svg слайдера
  createSvg(sliderModule) {
    const svg = new Svg(sliderModule);
    svg.init();
  }

  changeSvg(config) {
    this.wrapper.find('.s3d__svg-container').remove();
    this.createSvg(config);
  }

  createArrow() {
    const arrowLeft = createMarkup('button', { class: 's3d__button s3d__button-left js-s3d__button-left unselectable', content: '<svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM22 10.5L2 10.5L2 13.5L22 13.5L22 10.5Z" /></svg>' });
    arrowLeft.dataset.type = 'prev';

    const arrowRight = createMarkup('button', { class: 's3d__button s3d__button-right js-s3d__button-right unselectable', content: '<svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.0607 10.9393C21.6464 11.5251 21.6464 12.4749 21.0607 13.0607L11.5147 22.6066C10.9289 23.1924 9.97919 23.1924 9.3934 22.6066C8.80761 22.0208 8.80761 21.0711 9.3934 20.4853L17.8787 12L9.3934 3.51472C8.80761 2.92893 8.80761 1.97918 9.3934 1.3934C9.97918 0.807611 10.9289 0.807611 11.5147 1.3934L21.0607 10.9393ZM-1.31134e-07 10.5L20 10.5L20 13.5L1.31134e-07 13.5L-1.31134e-07 10.5Z" /></svg>' });
    arrowRight.dataset.type = 'next';

    this.wrapper.append(arrowLeft);
    arrowLeft.addEventListener('click', event => this._model.checkDirectionRotate(event.target.dataset.type));
    this.wrapper.append(arrowRight);
    arrowRight.addEventListener('click', event => this._model.checkDirectionRotate(event.target.dataset.type));
  }

  createBackground() {
    const top = createMarkup('div', { class: 's3d__slider__bg s3d__slider__bg-top' });
    const bottom = createMarkup('div', { class: 's3d__slider__bg s3d__slider__bg-bottom' });
    this._model.wrapper.append(top);
    this._model.wrapper.append(bottom);
  }
}


export default SliderView;
