import EventEmitter from '../eventEmitter/EventEmitter';

export default class WindowFlatView extends EventEmitter {
  constructor(model) {
    super();
    this.model = model;
    this.elToRender = document.querySelector('.s3d-flat__wrap');
    // this.elToRender.insertAdjacentHTML('beforeend', this.render());
    this.model.on('renderWindowViewForm', (response) => {
      console.log(response, 'RWESPONSE IN VIEW');
      document.querySelector('.s3d-flat__wrap').insertAdjacentHTML('beforeend', this.render());
      document.querySelector('[data-window-frame]').src = response.frameUrl;
      response.properties.forEach(prop => {
        document.querySelector('[data-window-props-wrap]').innerHTML += `
          <div>
            <div>${prop.icon}</div>
            <div>${prop.text}</div>
          </div>
        `;
      })
    });
  }

  render() {
    return `
<div class="window-view-layout">
    <div class="window-view-layout__left">
      <div class="window-view-layout__title h5">Вид з вікна</div>
      <div class="window-view-layout__delimiter"></div>
      <div class="window-view-layout__props-container" data-window-props-wrap></div>
    </div>
    <iframe src="" class="window-view-layout__right" data-window-frame></iframe>
</div>
`;
  }
}
