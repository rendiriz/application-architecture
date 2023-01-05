const { SchemaRegistry } = require('@kafkajs/confluent-schema-registry');
const fetch = require('@/libs/fetch');

const registryUrl = process.env.SCHEME_REGISTRY_URL;

const registry = new SchemaRegistry({ host: registryUrl });

const schema = async (subject, version) => {
  const url = `${registryUrl}/subjects/${subject}/versions/${version}/schema`;

  let response = await fetch(url);
  response = await response.json();
  return response;
};

const latestSchemaId = async (subject) => {
  return await registry.getLatestSchemaId(subject);
};

const registryId = async (subject) => {
  return await registry.getRegistryId(subject, version);
};

module.exports = {
  registry,
  schema,
  latestSchemaId,
  registryId,
};
