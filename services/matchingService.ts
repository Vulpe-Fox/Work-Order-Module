import { createConsumer, createProducer } from "../client/kafka.js";
import { TOPICS } from "../kafka/topics.js";
import { v4 as uuid } from "uuid";

async function run() {
    const consumer = await createConsumer("matching-service");
    const producer = await createProducer();

    await consumer.subscribe({ topic: TOPICS.WORKORDER_VALIDATED });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value!.toString());

            const worker = {
                workerId: "test-plumber",
                hourlyRate: event.payload.budgetMax
            };

            await producer.send({
                topic: TOPICS.WORKER_MATCHED,
                messages: [
                {
                    key: event.aggregateId,
                    value: JSON.stringify({
                    eventId: uuid(),
                    aggregateId: event.aggregateId,
                    timestamp: new Date().toISOString(),
                    type: TOPICS.WORKER_MATCHED,
                    payload: worker
                    })
                }
                ]
            });
        }
    });
}

run();