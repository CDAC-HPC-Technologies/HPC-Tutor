(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['connecting.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"terminal-connecting-progress\" class=\"connecting col s12 m6 offset-m3\">\n  <div class=\"col s3\">\n    <img src=\"/images/logo-head.png\" alt=\"Logo\" />\n  </div>\n  <div class=\"col s9\">\n    <h1>Connecting...</h1>\n    <h2>\n      Hang tight! We’re preparing the environment for you.\n    </h2>\n    <div class=\"progress\">\n      <div class=\"indeterminate blue\"></div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
templates['cookie-error.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"connecting col s12 m6 offset-m3\">\n  <div class=\"col s3\">\n    <img src=\"/images/logo-head.png\" alt=\"Logo\" />\n  </div>\n  <div class=\"col s9\">\n    <h1>Sorry, but we need cookies!</h1>\n    <h2>\n      We know it's not ideal, and we're working on fixing this ASAP. Thank you for bearing with us.\n    </h2>\n  </div>\n</div>\n";
},"useData":true});
templates['file-tab.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"ktab draggable "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " kfiletab\" data-path=\""
    + alias3((helpers.prefix_file_tab_path || (depth0 && depth0.prefix_file_tab_path) || alias2).call(alias1,(depth0 != null ? depth0.path : depth0),{"name":"prefix_file_tab_path","hash":{},"data":data}))
    + "\" data-filename=\""
    + alias3((helpers.get_filename || (depth0 && depth0.get_filename) || alias2).call(alias1,(depth0 != null ? depth0.filename : depth0),{"name":"get_filename","hash":{},"data":data}))
    + "\" data-view-id=\"#file"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.get_filename || (depth0 && depth0.get_filename) || alias2).call(alias1,(depth0 != null ? depth0.filename : depth0),{"name":"get_filename","hash":{},"data":data}))
    + " <a href=\"#\" class=\"tab-progress hidden\"><i class=\"fa-li fa fa-spinner fa-spin\"></i></a><a href=\"#\" class=\"close-tab hidden\"><i class=\"fa fa-times\"></i></a></div>\n";
},"useData":true});
templates['ide.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section id=\"file"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"col s12 ace-editor "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" data-path=\""
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" data-filename=\""
    + alias4((helpers.get_filename || (depth0 && depth0.get_filename) || alias2).call(alias1,(depth0 != null ? depth0.filename : depth0),{"name":"get_filename","hash":{},"data":data}))
    + "\">\n</section>\n<section class=\"file-loading-progress hidden\" id=\"progress-file"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <h1>Opening...</h1>\n\n  <div class=\"preloader-wrapper big active\">\n    <div class=\"spinner-layer\">\n      <div class=\"circle-clipper left\">\n        <div class=\"circle\"></div>\n      </div><div class=\"gap-patch\">\n        <div class=\"circle\"></div>\n      </div><div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n    </div>\n</section>\n";
},"useData":true});
templates['iframe-tab.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"itab-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"ktab draggable iframetab "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-view-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-port=\""
    + alias4(((helper = (helper = helpers.port || (depth0 != null ? depth0.port : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"port","hash":{},"data":data}) : helper)))
    + "\" data-src=\""
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\" data-host=\""
    + alias4((helpers.defaultTerminalHost || (depth0 && depth0.defaultTerminalHost) || alias2).call(alias1,(depth0 != null ? depth0.host : depth0),{"name":"defaultTerminalHost","hash":{},"data":data}))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " <a href=\"\" class=\"refresh-iframe-tab\"><i class=\"fa fa-sync\"></i></a> <a href=\"\" class=\"external-iframe-tab\"><i class=\"fa fa-external-link-alt\"></i></a></div>\n";
},"useData":true});
templates['iframe.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<iframe id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias4(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" width=\"100%\" height=\"95%\"></iframe>\n";
},"useData":true});
templates['iframe_fullscreen.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<iframe id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias4(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" width=\"100%\" height=\"95%\"></iframe>\n";
},"useData":true});
templates['tab.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <a class=\"ktab draggable "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" href=\""
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div class=\"ktab draggable "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-view-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-port=\""
    + alias4(((helper = (helper = helpers.port || (depth0 != null ? depth0.port : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"port","hash":{},"data":data}) : helper)))
    + "\" data-host=\""
    + alias4(((helper = (helper = helpers.host || (depth0 != null ? depth0.host : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"host","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " <a href=\"\" class=\"close-tab hidden\"><i class=\"fa fa-times\"></i></a></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.href : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['terminal-tab.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"ktab draggable "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-host=\""
    + alias4((helpers.defaultTerminalHost || (depth0 && depth0.defaultTerminalHost) || alias2).call(alias1,(depth0 != null ? depth0.target : depth0),{"name":"defaultTerminalHost","hash":{},"data":data}))
    + "\" data-command=\""
    + alias4(((helper = (helper = helpers.command || (depth0 != null ? depth0.command : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"command","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"useData":true});
templates['terminal.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-host=\""
    + alias4((helpers.defaultTerminalHost || (depth0 && depth0.defaultTerminalHost) || alias2).call(alias1,(depth0 != null ? depth0.host : depth0),{"name":"defaultTerminalHost","hash":{},"data":data}))
    + "\" class=\"terminal-container "
    + alias4(((helper = (helper = helpers["class"] || (depth0 != null ? depth0["class"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data}) : helper)))
    + "\">\n</section>\n";
},"useData":true});
})();