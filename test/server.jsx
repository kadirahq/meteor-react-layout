Tinytest.addAsync(
'ReactLayout - Render simple component',
function(test, done) {
  var text = Random.id();
  var simpleComp = React.createClass({
    render() {
      return <div>
        <p>{text}</p>
      </div>
    }
  });
  
  var ssrContext = {
    setHtml: function(html) {
      var regexp = new RegExp(text);
      test.isTrue(regexp.test(html));
      done();
    }
  };

  initFlowRouter(ssrContext);
  ReactLayout.render(simpleComp);
});

Tinytest.addAsync(
'ReactLayout - Render simple component with props',
function(test, done) {
  var text = Random.id();
  var simpleComp = React.createClass({
    render() {
      return <div>
        <p>{this.props.content}</p>
      </div>
    }
  });

  var ssrContext = {
    setHtml: function(html) {
      var regexp = new RegExp(text);
      test.isTrue(regexp.test(html));
      done();
    }
  };

  initFlowRouter(ssrContext);
  ReactLayout.render(simpleComp, {content: text});
});

function initFlowRouter (ssrContext) {
  Package['kadira:flow-router-ssr'] = {
    FlowRouter: {
      ssrContext: {
        get: function() {
          return ssrContext
        }
      }
    }
  };
}