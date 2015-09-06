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

  ReactLayout.render(simpleComp);
  setTimeout(function() {
    var reactText = $('#react-root').text();
    test.equal(reactText, text);
    done();
  }, 10);
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

  ReactLayout.render(simpleComp, {content: text});
  
  setTimeout(function() {
    var reactText = $('#react-root').text();
    test.equal(reactText, text);
    done();
  }, 10);
});