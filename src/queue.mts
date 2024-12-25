import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageBatchCommand,
} from "@aws-sdk/client-sqs";

export class Queue {
  private readonly client: SQSClient;

  constructor(private readonly options: QueueOptions) {
    this.client = new SQSClient({
      region: options.region,
      profile: options.profile,
    });
  }

  public async pull(stream: NodeJS.WriteStream) {
    console.log("pulling messages from queue ", this.options.queueUrl);
    const input = {
      QueueUrl: this.options.queueUrl,
      MaxNumberOfMessages: this.options.maxMessages,
      WaitTimeSeconds: this.options.wait,
    };
    console.log("input ", input);
    const command = new ReceiveMessageCommand(input);
    try {
      const response = await this.client.send(command);
      if (response.Messages) {
        for (const message of response.Messages) {
          if (this.options.verbose) {
            process.stderr.write(`Message ${message.Body}\n`);
          }
          const messageJson = JSON.stringify(message.Body) + "\n"; // Convert to JSON and add newline for readability
          const canWrite = stream.write(messageJson); // Write JSON string
          if (!canWrite) {
            // Wait for the 'drain' event before writing more
            await new Promise<void>((resolve) => {
              stream.once("drain", resolve);
            });
          }
        }
        if (this.options.delete) {
          if (response.Messages && response.Messages.length > 0) {
            const deleteEntries = response.Messages.map((message) => ({
              Id: message.MessageId!, // MessageId is always defined if there are messages
              ReceiptHandle: message.ReceiptHandle!, // ReceiptHandle is also always defined
            }));

            const deleteCommand = new DeleteMessageBatchCommand({
              QueueUrl: this.options.queueUrl,
              Entries: deleteEntries,
            });

            try {
              const deleteResponse = await this.client.send(deleteCommand);
              if (deleteResponse.Failed && deleteResponse.Failed.length > 0) {
                process.stderr.write(
                  `Deleted messages: failed ${
                    deleteResponse.Failed?.length
                  } ID's ${deleteResponse.Failed?.map((f) => f.Id).join(
                    ", "
                  )}\n`
                );
              }
              if (
                deleteResponse.Successful &&
                deleteResponse.Successful.length > 0
              ) {
                process.stderr.write(
                  `Deleted messages: successful ${
                    deleteResponse.Successful?.length
                  } ID's ${deleteResponse.Successful?.map((s) => s.Id).join(
                    ", "
                  )}\n`
                );
              }
            } catch (deleteError) {
              process.stderr.write(`Error deleting messages: ${deleteError}\n`);
              // Handle deletion errors (e.g., retry later)
            }
          }
        }
      }
    } catch (error) {
      console.error("Error pulling messages from queue", error);
      throw error;
    } finally {
      stream.end();
    }
  }
}

export interface QueueOptions {
  queueUrl: string;
  region: string;
  profile: string;
  wait: number;
  timeout: number;
  maxMessages: number;
  verbose: boolean;
  delete: boolean;
}
