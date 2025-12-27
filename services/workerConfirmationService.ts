import { createConsumer, createProducer } from "../client/kafka.js";
import { TOPICS } from "../kafka/topics.js";
import { v4 as uuid } from "uuid";

async function run() {
  const consumer = await createConsumer("worker-confirmation");
  const producer = await createProducer();

  await consumer.subscribe({ topic: TOPICS.WORKER_MATCHED });

  await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value!.toString());

            await producer.send({
                topic: TOPICS.MATCH_CONFIRMED,
                messages: [
                {
                    key: event.aggregateId,
                    value: JSON.stringify({
                    eventId: uuid(),
                    aggregateId: event.aggregateId,
                    timestamp: new Date().toISOString(),
                    type: TOPICS.MATCH_CONFIRMED,
                    payload: event.payload
                    })
                }
                ]
            });
        }
    });
}

run();