import Pulsar, { Client } from "pulsar-client";
import { ConsumerFactory } from "../consumer-factory";

(async () => {
  // Create a client
  const client = new Pulsar.Client({
    serviceUrl: "pulsar://localhost:6650",
  });

  const consumerFactory = new ConsumerFactory();

  // Create a consumer
  const consumer = await consumerFactory.createConsumer(
    client,
    "simple-topic",
    "simple-consumer",
    "simple-subscription",
    "Exclusive"
  );

  // Receive messages
  for (let i = 0; i < 10; i += 1) {
    const msg = await consumer.receive();
    console.log(msg.getData().toString());
    consumer.acknowledge(msg);
  }

  await consumer.close();
  await client.close();
})();
