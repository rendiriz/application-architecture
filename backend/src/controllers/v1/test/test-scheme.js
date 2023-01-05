const { schema, latestSchemaId } = require('@/libs/registry');

const topic = 'test';

async function getScheme() {
  const subjectKey = `${topic}-key`;
  const subjectValue = `${topic}-value`;

  const ids = {
    key: await latestSchemaId(subjectKey),
    value: await latestSchemaId(subjectValue),
  };

  const schemas = {
    key: await schema(subjectKey, ids.key),
    value: await schema(subjectValue, ids.value),
  };

  return { ids, schemas };
}

module.exports = {
  topic,
  getScheme,
};
