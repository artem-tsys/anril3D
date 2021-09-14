<?php
// не должно быть пробелов перед первым тегом!!!
    echo json_encode('<div class="s3d-card js-s3d-card">
       <label data-id="" data-key="id" class="s3d-card__add-favourites js-s3d-add__favourites">
           <input type="checkbox" data-key="checked" />
           <svg><use xlink:href="#icon-favourites"></use></svg>
        </label>
        <div class="s3d-card__close js-s3d-card__close"></div>
        <div class="s3d-card__image"><img src="" data-key="src"></div>
        <div class="s3d-card__row s3d-card__top">
          <div class="s3d-card__title">
            <span>Квартира</span>
            <span data-key="type"></span>
          </div>
          <div class="s3d-card__type" data-key="update_rooms" data-s3d-value>
            <span data-key="rooms"></span>
            <span>К</span>
          </div>
        </div>
        <div class="s3d-card__data">
            <div class="s3d-card__row">
              <div class="s3d-card__name">Этаж</div>
              <div class="s3d-card__value" data-key="floor">9</div>
            </div>
            <div class="s3d-card__row">
              <div class="s3d-card__name">Загальна площа</div>
              <div class="s3d-card__value">
                <span data-key="area"></span>
                <span>м<sup>2</sup></span>
              </div>
            </div>
          </div>
              
          <div class="s3d-card__row s3d-card__price">
                <div class="s3d-card__name">Ціна за м<sup>2</sup></div>
                <div class="s3d-card__value">
                  <span data-key="price"></span>
                  <span>грн.</span>
                </div>
          </div>
          <div class="s3d-card__buttons">
                <button type="button" class="s3d-card__link js-s3d-card__link">Детальніше
                </button>
          </div>
   </div>')
?>
