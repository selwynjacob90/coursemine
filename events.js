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
    checkbox.visible = false;

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

var handle_filter_btn_click = function () {
  if(cm_layers["results_pane"].visible) {
    cm_layers["results_pane"].visible = false;
    cm_layers["results_filter"].visible = true;  
  } else {
    cm_layers["results_pane"].visible = true;
    cm_layers["results_filter"].visible = false;  
  }
}

var handle_fab_click = function () {
  if(cm_globals.fab_clicked) {
    cm_layers.fab_content.animate({ 
      properties : {
        opacity : 0
      },
      curve: "ease-in-out",
      time: 0.2
    }); 

    Utils.delay(0.35, function() {
      cm_layers.fab_bg.animate({
        properties : {
         width: 0
        },
        curve : "spring(200,20,5)",
      });
    });
    cm_globals.fab_clicked = false;
  } 
  else {
    cm_layers.fab_bg.visible = true;
    
    cm_layers.fab_bg.width = 0;
    cm_layers.fab_bg.animate({
      properties : {
        width: 621
      },
      curve : "spring(200,20,12)",
    });
    
    cm_layers.fab_content.opacity = 0;
    cm_layers.fab_content.visible = true;
    Utils.delay(0.3, function() {
      cm_layers.fab_content.animate({ 
        properties : {
          opacity : 1
        },
        curve: "ease-in-out",
        time: 0.2
      });  
    });
    
    cm_globals.fab_clicked = true;
  } //else
  
}

var handle_course_page = function () {
  cm_layers.Results.visible = false;
  var course_page_artboard = cm_layers["Course_Page"];
  course_page_artboard.scale = 0.5;
  course_page_artboard.visible = true;
}

var handle_actions_fab = function () {
  var actions_btn_icon = cm_layers.cl_icon,
      add_btn = cm_layers.add_btn, favorite_btn = cm_layers.favorite_btn,
      compare_btn = cm_layers.compare_btn, syllabus_btn = cm_layers.syllabus_btn
  
  if(cm_globals.actions_fab_clicked) {
    actions_btn_icon.animate({
      properties : {
        x : 42,
        y : 42,
        rotation: 0
      },
      curve: "ease-in-out",
      time : 0.1
    }); 
    cm_globals.actions_fab_clicked = false;

    Utils.delay(0.25, function() {
      syllabus_btn.animate({
        properties : {
          opacity : 0
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });
    Utils.delay(0.35, function() {
      compare_btn.animate({
        properties : {
          opacity : 0
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });
    Utils.delay(0.45, function() {
      favorite_btn.animate({
        properties : {
          opacity : 0
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });
    Utils.delay(0.55, function() {
      add_btn.animate({
        properties : {
          opacity : 0
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });    
  }
  else {
    actions_btn_icon.animate({
      properties : {
        x : 67,
        y : 32,
        rotation: 45
      },
      curve: "ease-in-out",
      time : 0.1
    }); 
    cm_globals.actions_fab_clicked = true;

    //actions items animations
    add_btn.opacity = 0, favorite_btn.opacity = 0,
    compare_btn.opacity = 0, syllabus_btn.opacity = 0;

    add_btn.visible = true, favorite_btn.visible = true,
    compare_btn.visible = true, syllabus_btn.visible = true;

    Utils.delay(0.2, function() {
      add_btn.animate({
        properties : {
          opacity : 1
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });
    Utils.delay(0.3, function() {
      favorite_btn.animate({
        properties : {
          opacity : 1
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });
    Utils.delay(0.4, function() {
      compare_btn.animate({
        properties : {
          opacity : 1
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });
    Utils.delay(0.5, function() {
      syllabus_btn.animate({
        properties : {
          opacity : 1
        },
        curve : "ease-in-out",
        time : 0.2
      });
    });
  }//else
  
}

var handle_dashboard = function () {
  cm_layers.reviews_active.visible = false;
  cm_layers.qa_active.visible = false;
  cm_layers.overview_active.visible = false;
  cm_layers.analytics_active.visible = true;

  cm_layers.main_overview.visible = false;
  cm_layers.main_reviews.visible = false;
  cm_layers.main_qa.visible = false;
  cm_layers.main_dashboard.visible = true;

  cm_globals.coursepage_state = "dashboard";
}

var handle_overview = function () {
  cm_layers.analytics_active.visible = false;
  cm_layers.reviews_active.visible = false;
  cm_layers.qa_active.visible = false;
  cm_layers.overview_active.visible = true;

  cm_layers.main_dashboard.visible = false;
  cm_layers.main_reviews.visible = false;
  cm_layers.main_qa.visible = false;
  cm_layers.main_overview.visible = true;

  cm_globals.coursepage_state = "overview";
}

var handle_reviews = function () {
  cm_layers.analytics_active.visible = false;
  cm_layers.qa_active.visible = false;
  cm_layers.overview_active.visible = false;
  cm_layers.reviews_active.visible = true;

  cm_layers.main_dashboard.visible = false;
  cm_layers.main_overview.visible = false;
  cm_layers.main_qa.visible = false;
  cm_layers.main_reviews.visible = true;

  cm_globals.coursepage_state = "reviews";
}

var handle_qa = function () {
  cm_layers.analytics_active.visible = false;
  cm_layers.overview_active.visible = false;
  cm_layers.reviews_active.visible = false;
  cm_layers.qa_active.visible = true;

  cm_layers.main_dashboard.visible = false;
  cm_layers.main_overview.visible = false;
  cm_layers.main_reviews.visible = false;
  cm_layers.main_qa.visible = true;

  cm_globals.coursepage_state = "qa";
}

var handle_add_btn = function () {
  if(this.opacity == 1) {
    //console.log(cm_globals.coursepage_state);
    var modal = cm_layers.review_modal;
    modal.opacity = 0;
    modal.visible = true;
    modal.animate({
      properties : {
        opacity: 1
      },
      curve: "ease-in-out",
      time : 0.25
    })
    handle_actions_fab();
  }
}

var handle_add_close = function () {
  var modal = cm_layers.review_modal;
  modal.animate({
    properties : {
      opacity: 0
    },
    curve: "ease-in-out",
    time : 0.25
  })
  Utils.delay(0.35, function() {
    modal.visible = false;  
  })
  
}