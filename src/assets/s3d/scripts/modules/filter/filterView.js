import $ from 'jquery';
import EventEmitter from '../eventEmitter/EventEmitter';

class FilterView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;
    if (!this.matchTablet()) {
      this.filterTopHeight = document.querySelector('.s3d-filter__top').offsetHeight;
    }

    $('.js-s3d-filter__button--reset').on('click', () => {
      this.emit('resetFilter');
    });
    $('.js-s3d-filter__close').on('click', () => {
      this.hidden();
    });
    $('.js-s3d-filter').on('click', '.js-s3d-filter__button--apply', () => {
      this.hidden();
    });

    $('.js-s3d-filter__select').on('click', 'input', () => {
      this.emit('changeFilterHandler');
    });

    $('.js-s3d-filter__hide').on('click', () => {
      this.hideFilterBlock();
    });

    $('.js-s3d-ctr__open-filter').on('click', event => {
      event.preventDefault();
      this.show();
    });

    $(window).resize(() => {
      this.emit('resizeHandler');
      this.filterTopHeight = document.querySelector('.s3d-filter__top').offsetHeight;
    });

    model.on('showSelectElements', data => { this.showSvgSelect(data); });
    model.on('hideSelectElements', () => { this.hideSvgSelect(); });
    model.on('hideFilter', () => { this.hidden(); });
    model.on('setAmountAllFlat', data => { this.setAmountAllFlat(data); });
    model.on('setAmountSelectFlat', data => { this.setAmountSelectFlat(data); });
    model.on('updateMiniInfo', data => { this.updateMiniInfo(data); });
    model.on('updateHeightFilter', () => { this.updateHeightFilter(); });
    model.on('updateViewOfCurrentState', (data) => {
      this.updateViewOfCurrentState(data);
    });
  }

  updateViewOfCurrentState(data) {
    // console.log('update emit');
    const { type } = data;
    // const datasetNameForRender = 'filterStateName';
    const datasetNameForRender = 'data-filter-state-name';
    const elemsToUpdate = document.querySelectorAll(`[${datasetNameForRender}*='${type}']`);
    elemsToUpdate.forEach(elForUpdateArg => {
      const elForUpdate = elForUpdateArg;
      const renderTypeDatasetValue = elForUpdate
        .getAttribute(datasetNameForRender);
      const typeOfUpdate = renderTypeDatasetValue.split('~')[1]; // mix or max
      elForUpdate.textContent = data[typeOfUpdate];
    });
    // console.log();
  }

  updateHeightFilter() {
    if (this.matchTablet() || this.matchMobile()) {
      this.filterTopHeight = '';
    } else {
      this.filterTopHeight = document.querySelector('.s3d-filter__top').offsetHeight;
    }
  }

  // показать фильтр
  show() {
    $('.s3d-filter__top').css('height', this.filterTopHeight);
    $('.js-s3d-filter').addClass('s3d-open-filter');
  }

  matchTablet() {
    return window
      .matchMedia('(min-width: 575px) and (max-width:992px)')
      .matches;
  }

  matchMobile() {
    return window
      .matchMedia('(max-width: 600px)')
      .matches;
  }

  // спрятать фильтр
  hidden() {
    $('.js-s3d-filter').removeClass('s3d-open-filter');
    $('.s3d-filter__top').css('height', '');
  }

  setAmountAllFlat(value) {
    $('.js-s3d__amount-flat__num-all').html(value);
  }

  // установить кол-во наденных квартир
  setAmountSelectFlat(amount) {
    $('.js-s3d__amount-flat__num').html(amount);
  }

  hideSvgSelect() {
    $('.js-s3d__svgWrap .active-selected').removeClass('active-selected');
  }

  // подсвечивает квартиры на svg облёта
  showSvgSelect(data) {
    $('#js-s3d__wrapper polygon.active-selected').removeClass('active-selected');
    data.forEach(flat => {
      $(`#js-s3d__wrapper polygon[data-id=${flat.id || +flat}]`).addClass('active-selected');
    });
  }

  updateMiniInfo(data) {
    const { value, type, key } = data;
    const wrap = $(`.js-s3d-filter__mini-info [data-type=${type}]`);
    wrap.find(`[data-type=${key}]`).html(value);
  }

  hideFilterBlock() {
    $('.js-s3d-filter').addClass('s3d-filter__scroll-active');
  }
}

export default FilterView;
