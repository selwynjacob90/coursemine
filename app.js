var init_scale = function () {
  var artboard = cm_layers["Landing"];
  artboard.scale = 0.5;

  for (layer_name in cm_layers) {
	  var layer = cm_layers[layer_name];
	  layer.originX = 0;
	  layer.originY = 0;
  }
}

var attach_event_handlers = function () {
  cm_layers["Search_Input"].on(Events.Click, handle_search_inp_click);
  cm_layers["Search_Button"].on(Events.Click, handle_search_btn_click);
}

//init
var cm_layers = Framer.Importer.load("imported/coursemine");
var typed_text;
init_scale();
attach_event_handlers();