Package.describe({
  name: 'kadira:react-layout',
  summary: 'Layout Manager for React with SSR Support',
  version: '1.0.0',
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
  api.versionsFrom('1.0');

  api.use('meteorhacks:flow-router-ssr@2.0.1', ['client', 'server'], {weak: true});
  api.addFiles('lib/react_layout.js', ['client', 'server']);
}