const { Kafka, logLevel } = require('kafkajs');

const kafka1Url = process.env.KAFKA_1_URL;

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  clientId: 'falser',
  brokers: [kafka1Url],
});

module.exports = kafka;
