ReactLayout = {};
ReactLayout._domLoaded = false;
ReactLayout._rootProps = {};
ReactLayout._readyCallbacks = [];

ReactLayout.setRootProps = function(rootProps) {
  this._rootProps = rootProps;
};

ReactLayout._buildRootNode = function() {
  var props = this._rootProps || {};
  props.id = 'react-root';
  if(props.className) {
    props.class = props.className;
    delete props.className;
  }

  var propsString = '';
  for(var key in props) {
    var value = props[key];
    propsString += key + '="' + value + '" ';
  }

  var html = '<div ' + propsString + '></div>';
  return html;
};

ReactLayout._getRootNode = function() {
  var rootNode = document.getElementById('react-root');

  if(rootNode) {
    return rootNode;
  } else {
    var rootNodeHtml = this._buildRootNode();
    var body = document.getElementsByTagName('body')[0];
    body.insertAdjacentHTML('beforeend', rootNodeHtml);
    rootNode = document.getElementById('react-root');
    return rootNode;
  }
};

ReactLayout.render = function(layoutClass, regions) {
  if(Meteor.isClient) {
    return this._renderClient(layoutClass, regions);
  } else {
    return this._renderServer(layoutClass, regions);
  }
};

ReactLayout._renderServer = function(layoutClass, regions) {
  var el = React.createElement(layoutClass, regions);
  var elHtml = ReactDOMServer.renderToString(el);

  var rootNodeHtml = this._buildRootNode();
  var html = rootNodeHtml.replace('</div>', elHtml + '</div>');

  if(Package['kadira:flow-router-ssr']) {
    var FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;
    var ssrContext = FlowRouter.ssrContext.get();
    ssrContext.setHtml(html);
  }
};

ReactLayout._renderClient = function(layoutClass, regions) {
  var self = this;
  this._ready(function() {
    var rootNode = self._getRootNode();
    var el = React.createElement(layoutClass, regions);
    ReactDOM.render(el, rootNode);
  });
};

ReactLayout._ready = function(cb) {
  var self = this;
  if(self._domLoaded) {
    cb();
  } else {
    self._readyCallbacks.push(cb);
  }
};

// wait for DOM is loading
Meteor.startup(function() {
  setTimeout(function() {
    ReactLayout._domLoaded = true;
    ReactLayout._readyCallbacks.forEach(function(fn) {
      fn();
    });
  }, 10);
});
