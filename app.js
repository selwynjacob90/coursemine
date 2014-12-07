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

var attach_coursepage_navitems = function () {
  var nav_prefixes = ["o_", "d_", "r_", "q_"]

  _.each(nav_prefixes, function(prefix, idx, nav_prefixes) {
    cm_layers[prefix + "analytics"].on(Events.Click, handle_dashboard);
    cm_layers[prefix + "overview"].on(Events.Click, handle_overview);
    cm_layers[prefix + "reviews"].on(Events.Click, handle_reviews);
    cm_layers[prefix + "qa"].on(Events.Click, handle_qa);
  })
  
}

var attach_event_handlers = function () {
  cm_layers["Search_Input"].on(Events.Click, handle_search_inp_click);
  cm_layers["Search_Button"].on(Events.Click, handle_search_btn_click);


  cm_layers["Filters"].subLayersByName("apply_btn")[0].on(Events.Click, handle_filter_btn_click);
  cm_layers["search_fab"].on(Events.MouseOver, function () {
    this.style.cursor = "pointer";
  });
  cm_layers["search_fab"].on(Events.Click, handle_fab_click);
  cm_layers["582_title_0"].on(Events.Click, handle_course_page);
  cm_layers["582_title_1"].on(Events.Click, handle_course_page);
  cm_layers["actions_fab"].on(Events.Click, handle_actions_fab);
  attach_coursepage_navitems();
  
}

//init
var cm_layers = Framer.Importer.load("imported/coursemine");
var layers_to_hide = [
  "Auto_Results", "results_filter", "fab_bg", "fab_content",
  "add_btn", "favorite_btn", "compare_btn", "syllabus_btn",
  "main_dashboard", "analytics_active", "qa_active", "reviews_active",
  "main_reviews", "main_qa"
]

var cm_globals = {
  fab_clicked : false,
  actions_fab_clicked : false
};

var typed_text;

init_scale();
hide_layers();
attach_event_handlers();