var simulate_typing = function(sentence, text_layer) {
  var letters, type_it;
  letters = sentence.split('');
  text_layer.html = '';
  type_it = function(i) {
    if (i < letters.length) {
      text_layer.html = text_layer.html + letters[i];
      i++;
      return Utils.delay(Utils.randomNumber(0, 0.15), function() {
        return type_it(i);
      });
    }
  };
  return type_it(0);
}

var render_search_suggestions = function () {
  Utils.delay(0.8, function () {
    cm_layers.Search_Overlay.animate({
      properties : {
        height : 420
      },
      time: 0.1
    });
    Utils.delay(0.2, function() {
      cm_layers.Auto_Results.visible = true;  
    })
    
  })
}

var handle_search_inp_click = function () {
  var help_text = this.subLayersByName("help_text")[0];
  help_text.visible = false;

  typed_text = new Layer({
    x: 287,
    y: 385.5,
  });

  typed_text.style = {
    'background-color': 'transparent',
    'width': 'auto',
    'color': '#fff',
    'font': 'Roboto',
    'font-weight': 300
  };

  simulate_typing("Interaction Design", typed_text);
  // show search suggestions
  render_search_suggestions();
}

var handle_checkboxes = function () {
  var checkboxes_on = [], checkboxes_off = [], tmp;
  var filters = cm_layers["Filters"];
  //TODO: put sublayers in a list and iterate
  tmp = filters.subLayersByName("status")[0].subLayersByName("check_on");
  checkboxes_on = _.union(checkboxes_on, tmp);
  tmp = filters.subLayersByName("status")[0].subLayersByName("check_off");
  checkboxes_off = _.union(checkboxes_off, tmp);
  
  tmp = filters.subLayersByName("Course_Level")[0].subLayersByName("check_on");
  checkboxes_on = _.union(checkboxes_on, tmp);
  tmp = filters.subLayersByName("Course_Level")[0].subLayersByName("check_off");
  checkboxes_off = _.union(checkboxes_off, tmp);

  tmp = filters.subLayersByName("status")[0].subLayersByName("check_on");
  checkboxes_on = _.union(checkboxes_on, tmp);
  tmp = filters.subLayersByName("status")[0].subLayersByName("check_off");
  checkboxes_off = _.union(checkboxes_off, tmp);
  
  tmp = filters.subLayersByName("Credits")[0].subLayersByName("check_on");
  checkboxes_on = _.union(checkboxes_on, tmp);
  tmp = filters.subLayersByName("Credits")[0].subLayersByName("check_off");
  checkboxes_off = _.union(checkboxes_off, tmp);
  
  _.each(checkboxes_off, function(checkbox, idx, checkboxes_off) {    
    checkbox.on(Events.Click, function() {
      checkbox.animate({
        properties: {
          opacity: 0
        },
        time: 0.3,
        curve: "ease-in-out"
      });
      checkbox.visible = false;

      checkboxes_on[idx].opacity = 0;
      checkboxes_on[idx].visible = true;
      checkboxes_on[idx].animate({
        properties: {
          opacity: 1
        },
        time: 0.3,
        curve: "ease-in-out"
      });
    });

  });

  _.each(checkboxes_on, function(checkbox, idx, checkboxes_on) {
    
    checkbox.on(Events.Click, function() {      
      checkbox.animate({
        properties: {
          opacity: 0
        },
        time: 0.3,
        curve: "ease-in-out"
      });
      checkbox.visible = false;

      checkboxes_off[idx].opacity = 0;
      checkboxes_off[idx].visible = true;
      checkboxes_off[idx].animate({
        properties: {
          opacity: 1
        },
        time: 0.3,
        curve: "ease-in-out"
      });
    });

  });
}

var handle_search_btn_click = function () {
  cm_layers["Landing"].visible = false;
  typed_text.visible = false;
  
  var results_artboard = cm_layers["Results"];
  results_artboard.scale = 0.5;
  results_artboard.visible = true;

  handle_checkboxes();
}