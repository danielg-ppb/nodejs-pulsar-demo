import Pulsar from "pulsar-client";

async function produce() {
  const client = new Pulsar.Client({
    serviceUrl: "pulsar://localhost:6650",
  });

  const producer = await client.createProducer({
    topic: "demo-topic",
  });

  for (let i = 0; i < 10; i += 1) {
    const msg = "Message " + i;

    await producer.send({
      data: Buffer.from(msg),
    });

    console.log("Message:", msg);
  }

  await producer.close();
  await client.close();
}

produce().catch(console.error);
