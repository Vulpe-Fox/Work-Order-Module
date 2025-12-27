import { createConsumer, createProducer } from "../client/kafka.js";
import { TOPICS } from "../kafka/topics.js";
import { v4 as uuid } from "uuid";

async function run() {
  const consumer = await createConsumer("payment-service");
  const producer = await createProducer();

  await consumer.subscribe({ topic: TOPICS.MATCH_CONFIRMED });

  await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value!.toString());

            const amount = event.payload.hourlyRate * 1;

            await producer.send({
                topic: TOPICS.PAYMENT_AUTHORIZED,
                messages: [
                {
                    key: event.aggregateId,
                    value: JSON.stringify({
                    eventId: uuid(),
                    aggregateId: event.aggregateId,
                    timestamp: new Date().toISOString(),
                    type: TOPICS.PAYMENT_AUTHORIZED,
                    payload: {
                        amount,
                        currency: "CAD",
                        paymentIntentId: uuid()
                    }
                    })
                }
                ]
            });
        }
    });
}

run();