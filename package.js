Package.describe({
  name: 'kadira:react-layout',
  summary: 'Layout Manager for React with SSR Support',
  version: '1.3.1',
  git: 'https://github.com/kadirahq/meteor-react-layout.git'
});

Package.onUse(function(api) {
  configure(api);
  api.export('ReactLayout');
});

Package.onTest(function(api) {
  configure(api);
  api.use('react');
  api.use('tinytest');

  api.addFiles('test/client.jsx', 'client');
  api.addFiles('test/server.jsx', 'server');
});


function configure(api) {
  api.use('react-runtime@0.13.3', ['client', 'server'], {weak: true});
  api.use('kadira:flow-router-ssr@3.3.0', ['client', 'server'], {weak: true});
  api.addFiles('lib/react_layout.js', ['client', 'server']);
}
