Package.describe({
  name: 'kadira:react-layout',
  summary: 'Layout Manager for React with SSR Support',
  version: '1.5.3',
  git: 'https://github.com/kadirahq/meteor-react-layout.git'
});

Package.onUse(function(api) {
  configure(api);
  api.export('ReactLayout');
});

Package.onTest(function(api) {
  api.use('random');
  api.use('tinytest');
  api.use('jquery');
  configure(api);

  api.addFiles('test/client.jsx', 'client');
  api.addFiles('test/server.jsx', 'server');
  api.addFiles('test/both.jsx', ['server', 'client']);
});

function configure(api) {
  api.use('kadira:flow-router-ssr@3.4.0', ['client', 'server'], {weak: true});
  // We don't browserify, but this version fix a huge build time
  // delay, which exists in the react package.
  // Once, react package comes with the updated version, we can remove this.
  api.use('cosmos:browserify@0.8.3');

  api.addFiles('lib/react_layout.js', ['client', 'server']);
}
