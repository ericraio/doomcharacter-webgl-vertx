def webServerConf = [
  port: 8080,
  host: 'localhost'
]

container.deployVerticle('web-server', webServerConf);
