import { createConsumer, createProducer } from "../client/kafka.js";
import { TOPICS } from "../kafka/topics.js";
import { v4 as uuid } from "uuid";

async function run() {
    const consumer = await createConsumer("finalization-service");
    const producer = await createProducer();

    await consumer.subscribe({ topic: TOPICS.PAYMENT_AUTHORIZED });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value!.toString());

            await producer.send({
                topic: TOPICS.WORKORDER_CONFIRMED,
                messages: [
                {
                    key: event.aggregateId,
                    value: JSON.stringify({
                    eventId: uuid(),
                    aggregateId: event.aggregateId,
                    timestamp: new Date().toISOString(),
                    type: TOPICS.WORKORDER_CONFIRMED,
                    payload: { status: "CONFIRMED" }
                    })
                }
                ]
            });
        }
    });
}

run();