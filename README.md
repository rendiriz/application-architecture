# Application Architecture

On production remove network or host.docker.internal to IP

1. Run Zookeeper & Kafka

```
sudo chown -R 1000:1000 ./zookeeper/data
sudo chown -R 1000:1000 ./zookeeper/txn-logs
sudo chown -R 1000:1000 ./kafka/data
```

```
docker-compose -f dc-kafka.yml up -d
```

2. Run Schema Registry

```
docker-compose -f dc-schema-registry.yml up -d
```

3. Run Kafka Connect

```
docker-compose -f dc-kafka-connect.yml up -d --build
```

4. Run KsqlDB

```
docker-compose -f dc-ksqldb.yml up -d
```

5. Run Kafka UI

```
docker-compose -f dc-kafka-ui.yml --env-file ./kafka-ui/.env up -d
```

6. Run Postgres

```
docker-compose -f dc-postgres.yml --env-file ./postgres/.env up -d
```

## Setup

Schema Registry

```
// test-key
{
  "namespace": "test.key",
  "type" : "record",
  "name" : "TestKey",
  "fields" : [
    {
      "name": "id",
      "type": {"type": "string", "logicalType": "uuid"}
    },
    {
      "name": "timestamp",
      "type": {"type": "long", "logicalType": "timestamp-millis"}
    }
  ]
}

// test-value
{
  "namespace": "test.value",
  "type" : "record",
  "name" : "TestValue",
  "fields" : [
    {
      "name": "id",
      "type": {"type": "string", "logicalType": "uuid"}
    },
    {
      "name": "message",
      "type": "string"
    }
  ]
}
```

Kafka Connect Connector

```
{
  "name": "test-sink-connector",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://host.docker.internal:5432/falser",
    "connection.user": "administrator",
    "connection.password": "changeme",
    "input.data.format": "AVRO",
    "topics": "test",
    "insert.mode": "upsert",
    "db.timezone": "UTC",
    "auto.create": "true",
    "auto.evolve": "true",
    "pk.mode": "record_value",
    "pk.fields": "id"
  }
}
```

## To Do

- [ ] Security for Kafka Cluster
- [ ] Kafka Connect sink connector Cassandra
- [ ] Streaming ETL pipeline using ksqlDB
- [ ] Streaming ETL pipeline to Meilisearch
- [ ] Kafka consumer for realtime data
- [ ] Change PostgreSQL to Patroni
