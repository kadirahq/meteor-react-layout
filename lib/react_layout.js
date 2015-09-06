ReactLayout = {};

ReactLayout._getRootNode = function() {
  var rootNode = $('#react-root').get(0);

  if(rootNode) {
    return rootNode;
  } else {
    $('body').append('<div id="react-root"></div>');
    return $('#react-root').get(0);
  }
};

ReactLayout.render = function(layoutClass, regions) {
  if(Meteor.isClient) {
    return ReactLayout._renderClient(layoutClass, regions);
  } else {
    return ReactLayout._renderServer(layoutClass, regions);
  }
};

ReactLayout._renderServer = function(layoutClass, regions) {
  var el = React.createElement(layoutClass, regions);
  var html = React.renderToString(el);

  if(Package['kadira:flow-router-ssr']) {
    var FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;
    var ssrContext = FlowRouter.ssrContext.get();
    ssrContext.setHtml(html);
  }
};

ReactLayout._renderClient = function(layoutClass, regions) {
  var rootNode = ReactLayout._getRootNode();
  var el = React.createElement(layoutClass, regions);
  var renderdComp = React.render(el, rootNode);
};

ReactLayout._ready = function(cb) {
  // may be we need to come up with a better way to do this
  $(cb);
};