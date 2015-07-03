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

Note that, here you can don't create an element, but simply use the component class.

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

~~~

#### SSR Support

SSR Support is still experimental and you need to `meteorhacks:flow-router-ssr` for that. Have a look at [this sample app](https://github.com/arunoda/hello-react-meteor).
