Package.describe({
  name: 'kadira:react-layout',
  summary: 'Layout Manager for React with SSR Support',
  version: '1.4.1',
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
  api.use('react@0.14.1');
  api.use('kadira:flow-router-ssr@3.4.0', ['client', 'server'], {weak: true});
  api.addFiles('lib/react_layout.js', ['client', 'server']);
}
