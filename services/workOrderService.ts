import { v4 as uuid } from "uuid";
import { createProducer } from "../client/kafka.js";
import { TOPICS } from "../kafka/topics.js"

export async function createWorkOrder(req: any) {
    const producer = await createProducer();

    const workOrderId = uuid();

    await producer.send({
        topic: TOPICS.WORKORDER_REQUESTED,
        messages: [
        {
            key: workOrderId,
            value: JSON.stringify({
            eventId: uuid(),
            aggregateId: workOrderId,
            timestamp: new Date().toISOString(),
            type: TOPICS.WORKORDER_REQUESTED,
            payload: req
            })
        }
        ]
    });

    return { workOrderId, status: "PENDING" };
}