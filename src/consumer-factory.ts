import { Client, Consumer, SubscriptionType } from "pulsar-client";

export class ConsumerFactory {
  async createConsumer(
    client: Client,
    topicName: string,
    consumerName: string,
    subscriptionName: string,
    subscriptionType: SubscriptionType
  ): Promise<Consumer> {

    return await client.subscribe({
      topic: topicName,
      subscription: subscriptionName,
      subscriptionType: subscriptionType,
      consumerName: consumerName,
    });
  }
}
