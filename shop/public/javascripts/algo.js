var templates = '<article class="hit">' +
  '<div class="product-picture-wrapper">' +
    '<div class="product-picture"> <img src="/web/image/product.product/{{id}}/image" /></div>' +
  '</div>' +
  '<div class="product-desc-wrapper">' +
    '<div class="product-name">{{{name}}}</div>' + 
    '<div class="product-type">{{{description}}}</div>' +
    '<div class="product-price">${{product_variant_ids.0.list_price}}</div>' +
  '</article>'



var search = instantsearch({
  appId: 'YouAppId',
  apiKey: 'YouApiKey',
  indexName: 'YouIndexName',
  urlSync:    {
        useHash:    false,
        searchInputSelector: '#search-box'
    },

});


search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for products...',

  })
);


search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits-container',
    hitsPerPage: 6,
    templates: {
      empty: 'No results found matching',
      item : templates
      },
      transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);


search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination-container',
    cssClasses: {
      active: 'active'
    },
    labels: {
      previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
      next: 'Next page <i class="fa fa-angle-right fa-2x"></i>'
    },
    showFirstLast: false
  })
);

/* Voir la vitesse d'execution 
search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);
*/



/*search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: '#categories',
    attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1'],
    sortBy: ['name:asc'],
  })
);*/






/*search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#brands',
    attributeName: 'brand',
    operator: 'or',
    limit: 10,
    templates: {
      header:'<div class="facet-title">Brand</div class="facet-title">'
    }
  })
);*/

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#colors',
    attributeName: 'product_variant_ids.color',
    operator: 'or',
    limit: 10,
    templates: {
      header: '<div class="facet-title">Colors</div class="facet-title">'
    }
  })
);




search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#price',
    attributeName: 'product_variant_ids.list_price',
    templates: {
      header: '<div class="facet-title">Price</div class="facet-title">'
    },
    tooltips: {
      format: function(rawValue) {
        return '$' + Math.round(rawValue).toLocaleString();
      }
    }
  })
);




search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-eraser"></i> Clear all filters'
    },
    cssClasses: {
      root: 'btn btn-block btn-default'
    },
    autoHideContainer: false
  })
);


/*search.addWidget(
  instantsearch.widgets.sortBySelector({
    container: '#sort-by-container',
    indices: [
      {name: 'new', label: 'Featured'},
      {name: 'new_price_asc', label: 'Lowest price'},
      {name: 'new_price_desc', label: 'Highest price'}
    ]
  })
);*/


search.start();



    









