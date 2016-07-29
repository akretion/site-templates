
  var client = algoliasearch("GXJ6XPNVUT", "b271f5a0a74504bbeac802dc06d3059b");
  var index = client.initIndex('algolia-product');

  var products = Hogan.compile(' <img src="/web/image/product.product/{{id}}/image" />'+'{{{_highlightResult.name.value}}}'+'</br>'+'{{{_highlightResult.description.value}}}');
  var form = document.getElementById('form');
  var submit = document.getElementById('submit');

  autocomplete('#search', {hint: false}, [
    {
      source: autocomplete.sources.hits(index, {hitsPerPage: 5}),
      displayKey: 'name',
      templates: {
        header: '<div class="category">Produits</div>',
        empty:'aucune',
        suggestion: function(hit) {
          return products.render(hit);
      }
    }
  }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
       $( "form" ).on( "submit", function( event ) {
      form.action = ("http://0.0.0.0:5333/products/" + suggestion.name);  
    });
  });



