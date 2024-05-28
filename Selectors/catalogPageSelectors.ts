const catalogPageSelectors = {
    PRODUCT_CARD: '.catalog-grid .catalog-grid__cell:first-child',
    PRODUCT_LABLE_ITEMS: '.catalog-grid .catalog-grid__cell:first-child .goods-tile__inner >.goods-tile__content>span, .catalog-grid .catalog-grid__cell:first-child .goods-tile__inner >.goods-tile__content>div, .catalog-grid .catalog-grid__cell:first-child .goods-tile__inner >.goods-tile__content>a, .catalog-grid .catalog-grid__cell:first-child .goods-tile__inner >div>div',
    PRODUCT_ITEMS_LIST: '.catalog-grid__cell',
    SHOW_MORE_BUTTON: '.ng-star-inserted .show-more'
}

export {catalogPageSelectors}