import { createConsumer, createProducer } from "../client/kafka.js";
import { TOPICS } from "../kafka/topics.js";

async function run() {
    const consumer = await createConsumer("budget-validation");
    const producer = await createProducer();

    await consumer.subscribe({ topic: TOPICS.WORKORDER_REQUESTED });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value!.toString());

            const { budgetMin, budgetMax } = event.payload;
            if (budgetMin <= 0 || budgetMax < budgetMin) return;

            await producer.send({
                topic: TOPICS.WORKORDER_VALIDATED,
                messages: [
                {
                    key: event.aggregateId,
                    value: JSON.stringify({
                    ...event,
                    type: TOPICS.WORKORDER_VALIDATED
                    })
                }
                ]
            });
        }
    });
}

run();