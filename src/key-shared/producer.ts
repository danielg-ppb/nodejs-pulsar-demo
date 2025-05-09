import Pulsar from "pulsar-client";

(async () => {
  const client = new Pulsar.Client({
    serviceUrl: "pulsar://localhost:6650",
  });

  const producer = await client.createProducer({
    topic: "key-topic",
  });

  const keys = ["key-1", "key-2", "key-3"];

  for (let i = 0; i < 30; i++) {
    const key = keys[i % keys.length];
    const msg = `Message ${i + 1} with ${key}`;

    await producer.send({
      data: Buffer.from(msg),
      partitionKey: key,
    });
    console.log(`Sent: ${msg}`);

    await sleep(500);
  }

  await producer.close();
  await client.close();
})();

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}