var init_scale = function () {
  var artboard = cm_layers["Landing"];
  artboard.scale = 0.5;

  for (layer_name in cm_layers) {
	  var layer = cm_layers[layer_name];
	  layer.originX = 0;
	  layer.originY = 0;
  }
  cm_layers.fab_bg.rotationY = 180;
  cm_layers.fab_bg.x = cm_layers.fab_bg.x + 621;
}


var hide_layers = function () {
  _.each(layers_to_hide, function(layername, idx, layers_to_hide){
      cm_layers[layername].visible = false;
  })
}

var attach_event_handlers = function () {
  cm_layers["Search_Input"].on(Events.Click, handle_search_inp_click);
  cm_layers["Search_Button"].on(Events.Click, handle_search_btn_click);

  cm_layers["Filters"].subLayersByName("apply_btn")[0].on(Events.Click, handle_filter_btn_click);
  cm_layers["search_fab"].on(Events.Click, handle_fab_click);
}

//init
var cm_layers = Framer.Importer.load("imported/coursemine");
var layers_to_hide = [
  "Auto_Results", "results_filter", "fab_bg", "fab_content"
]
var cm_globals = {
  fab_clicked : false
};
var typed_text;

init_scale();
hide_layers();
attach_event_handlers();