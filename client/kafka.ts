import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "work-platform",
  brokers: ["localhost:9092"]
});

export const createProducer = async () => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

export const createConsumer = async (groupId: string) => {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return consumer;
};