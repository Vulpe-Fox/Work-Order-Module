export interface BaseEvent<T> {
    eventId: string;
    aggregateId: string;
    timestamp: string;
    type: string;
    payload: T;
}

export interface WorkOrderRequested {
    requesterId: string;
    skills: string[];
    startTime: string;
    endTime: string;
    budgetMin: number;
    budgetMax: number;
}

export interface WorkerMatched {
    workerId: string;
    hourlyRate: number;
}

export interface MatchConfirmed {
    workerId: string;
    hourlyRate: number;
}

export interface PaymentAuthorized {
    amount: number;
    currency: string;
    paymentIntentId: string;
}