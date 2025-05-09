import Pulsar, { Client } from "pulsar-client";
import { ConsumerFactory } from "../consumer-factory";

(async () => {
  // Create a client
  const client = new Pulsar.Client({
    serviceUrl: "pulsar://localhost:6650",
  });

  const consumerFactory = new ConsumerFactory();
  const consumerName = "Consumer 3";

  // Create a consumer
  const consumer = await consumerFactory.createConsumer(
    client,
    "key-topic",
    consumerName,
    "key-shared-sub",
    "KeyShared"
  );

  // Receive messages
  for (let i = 0; i < 30; i += 1) {
    const msg = await consumer.receive();
    console.log("Consumer with ID" + consumerName + " received message -> " + msg.getData().toString());
    consumer.acknowledge(msg);
  }
  await consumer.close();
  await client.close();
})();
