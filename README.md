# Work-Order-Module

A quick mockup EDA service module to match skilled tradesmen to work orders from property owners within a specific budget using **Kafka** and **Typescript** (Not Java, so very very irregular).

In this module, there is no central orchestrator, so all calls are asynchronous.

Events occur as follows:

**WorkOrderService**

   ->*workorder.requested*
   
**BudgetValidation**

   ->*workorder.validated*
   
**MatchingService**

   ->*worker.matched*
   
**WorkerConfirmation**

   ->*match.confirmed*
   
**PaymentService**

   ->*payment.authorized*
   
**Finalization**

   ->*workorder.confirmed*


