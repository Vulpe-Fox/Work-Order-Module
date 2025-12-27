export const TOPICS = {
    WORKORDER_REQUESTED: "workorder.requested",
    WORKORDER_VALIDATED: "workorder.validated",
    WORKER_SEARCH_REQUESTED: "worker.search.requested",
    WORKER_MATCHED: "worker.matched",
    WORKER_MATCH_FAILED: "worker.match.failed",
    MATCH_CONFIRMED: "match.confirmed",
    PAYMENT_AUTHORIZE_REQUESTED: "payment.authorize.requested",
    PAYMENT_AUTHORIZED: "payment.authorized",
    PAYMENT_FAILED: "payment.failed",
    WORKORDER_CONFIRMED: "workorder.confirmed"
} as const;