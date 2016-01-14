> #### NOTE
> With Meteor 1.3, use [react-mounter](https://github.com/kadirahq/react-mounter) instead of this. <br />
> Read this article for more information: [Getting Started with Meteor 1.3 and React](https://voice.kadira.io/getting-started-with-meteor-1-3-and-react-15e071e41cd1).

## React Layout

Simple React Layout Manager for Meteor with SSR Support.

With React Layout you can easily render react components both alike in client and server. In the server it uses Flow Router's upcoming SSR apis.

### Adding it to your project

~~~
meteor add kadira:react-layout
~~~

Then you use `ReactLayout.render()` to render your component. Rather than simply rendering a component, you can also use it as a layout manager like [Flow Layout](https://github.com/meteorhacks/flow-layout). 

Let's see few ways we can use the React Layout

#### Rendering a Simple Component

Let's say we've a pretty simple component like this:

```jsx
WelcomeComponent = React.createClass({
  render() {
    return <div>
      <h1>Hello, {this.props.name}</h1>
    </div>
  }
});
```

Now we can render this component with:

```js
ReactLayout.render(WelcomeComponent)
```

Note that, here you don't create an element, but simply use the component class.

You can also pass props like this:

```js
ReactLayout.render(WelcomeComponent, {name: "Arunoda"})
```

#### Using as a Layout Manager

We can simply use ReactLayout as a simple layout manager. Let's say we've a layout called `MainLayout`.

```jsx
MainLayout = React.createClass({
  render() {
    return <div>
      <header>
        This is our header
      </header>
      <main>
        {this.props.content}
      </main>
      <footer>
        This is our footer
      </footer>
    </div>
  }
});
```

Now let's try render our `WelcomeComponent` into the `MainLayout`.

```jsx
ReactLayout.render(MainLayout, {
  content: <WelcomeComponent name="Arunoda" />
})
```

That's it.

#### Using inside Flow Router

React Layout works pretty nicely with Flow Router. Here's an example:

~~~jsx
FlowRouter.route("/", {
  subscriptions: function() {
    var selector = {category: {$ne: "private"}};
    this.register('posts', Meteor.subscribe('posts', selector));
  },
  action: function() {
    ReactLayout.render(BlogLayout, {
      content: <PostList />
    });
  }
});

FlowRouter.route('/post/:_id', {
  name: 'post',
  subscriptions: function(params) {
    this.register('singlePost', Meteor.subscribe('singlePost', params._id));
  },
  action: function(params) {
    ReactLayout.render(BlogLayout, {
      content: <PostPage _id={params._id} />
    });
  }
});

~~~

#### Add Custom Props to Root Element

Sometimes, you need to set classes and other props to the root elements. Then this is how to do it. Simply call following function before render anything:

~~~js
ReactLayout.setRootProps({
  className: "ui middle aligned center aligned grid"
});
~~~

> If you are using SSR, you need to call `setRootProps` in the server side.

#### Using React Context 

If you'd like to use `getChildContext()` (for integrating [Material-UI](https://github.com/callemall/material-ui), for example), you must render the child component *within* the layout. You can do this by passing a function that renders the component rather than the component itself. In your layout component you can then call the function directly to render the component. See [#2](https://github.com/kadirahq/meteor-react-layout/issues/2) for a full discussion.

~~~jsx
MainLayout = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    return <div>
      <header>
        This is our header
      </header>
      <main>
        {this.props.content()}  /* note, this is a function call */
      </main>
      <footer>
        This is our footer
      </footer>
    </div>
  }
});

HomePage = React.createClass({
  render () {
    return (
      <div>
        <h1>This is the home page</h1>
        /* Rendering of material-ui components will work here */
      </div>
    );
  }
});

FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <HomePage />;
      }
    });
  }
});
~~~

#### SSR Support

SSR Support is still experimental and you need to use `meteorhacks:flow-router-ssr` for that. Have a look at [this sample app](https://github.com/arunoda/hello-react-meteor).
