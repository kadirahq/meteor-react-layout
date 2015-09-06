ReactLayout = {};
ReactLayout._domLoaded = false;

ReactLayout._getRootNode = function() {
  var rootNode = document.getElementById('react-root');

  if(rootNode) {
    return rootNode;
  } else {
    rootNode = document.createElement("div");
    rootNode.id = "react-root";
    document.getElementsByTagName('body')[0].appendChild(rootNode);
    return rootNode;
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
  this._ready(function() {
    var rootNode = ReactLayout._getRootNode();
    var el = React.createElement(layoutClass, regions);
    React.render(el, rootNode);
  });
};

ReactLayout._ready = function(cb) {
  var self = this;
  if(self._domLoaded) {
    cb();
    return;
  }

  // wait for DOM is loading
  Meteor.startup(function() {
    setTimeout(function() {
      cb();
      self._domLoaded = true;
    }, 0);
  });
};