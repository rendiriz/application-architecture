const { Partitioners, CompressionTypes } = require('kafkajs');
const kafka = require('@/libs/kafka');
const { registry } = require('@/libs/registry');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const { topic, getScheme } = require('./test-scheme');

// Kafka
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const create = async (req, res) => {
  try {
    await producer.connect();

    const qInsert = await getCreate(req);

    Promise.all([qInsert]).then(async (responses) => {
      const data = responses[0];
      return res.status(200).send({
        code: 200,
        error: 0,
        message: 'Successfully added data.',
        data: data,
      });
    });
  } catch (err) {
    console.error(`[example/producer] ${err.message}`, err);

    await producer.disconnect();

    return res.status(500).send({
      code: 500,
      error: 1,
      message: err.message,
      type: 'UnknownError',
      data: {},
    });
  }
};

async function getCreate(req) {
  const { ids, schemas } = await getScheme();

  const id = uuidv4();
  const insert = req.body;

  const payloads = [];

  const k = {
    id: id,
    timestamp: moment().unix(),
  };

  const v = {
    id,
    message: insert.message,
  };

  payloads.push({
    key: await registry.encode(ids.key, k),
    value: await registry.encode(ids.value, v),
  });

  return await producer.send({
    topic,
    compression: CompressionTypes.GZIP,
    messages: payloads,
  });
}

module.exports = {
  create,
  getCreate,
};
