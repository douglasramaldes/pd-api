exports.options = {
  routePrefix: "v1/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Omni API",
      description: "",
      version: "1.0.0"
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here"
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
  }
};
