# Change Log

### v1.5.3
* Updated dependency on React to 0.14.3

### v1.5.2
* Remove the hot fix to add correct ReactDOMServer support. react@0.14.1_1 has the fix.

### v1.5.1
* Add browerify@0.8.3 until react package released with it.

### v1.5.0
* Add React 0.14.x support
* We added some code, which can be removed after MDG merged [this PR](https://github.com/meteor/react-packages/pull/124).

### v1.4.1

* Fix the issue of adding two root dom nodes. See [#22](https://github.com/kadirahq/meteor-react-layout/issues/22).

### v1.4.0

* Add `ReactLayout.setRootProps()` api to add custom props to the root element. Usually useful to add classes when using semantic-ui.

### v1.3.1
* Depend on the react-runtime package weakly
* So, we always get it if it's in the project

### v1.3.0
* Get rid of jQuery

### v1.2.1

* Fix issue (FlowRouter#298)[https://github.com/kadirahq/flow-router/issues/298) where we try to use some non-standard way to render react components.
