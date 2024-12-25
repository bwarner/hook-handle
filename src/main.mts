import { Command } from "@commander-js/extra-typings";
import { Queue } from "./queue.mjs"; // Make sure to import QueueOptions

const program = new Command();

try {
  program
    .name("sqs-pull")
    .version("0.0.1")
    .description("Pull messages from an SQS queue")
    .option(
      "-b, --batch-size <number>",
      "The number of messages to pull at a time",
      parseInt
    ) // Add type conversion
    .option(
      "-q, --queue-url <string>",
      "The URL of the SQS queue",
      process.env.SQS_QUEUE_URL
    )
    .option("-x, --delete", "Delete the messages after processing", true)
    .option(
      "-n, --no-delete",
      "Do not delete the messages after processing",
      false
    )
    .option(
      "-m, --max-messages <number>",
      "The maximum number of messages to pull",
      (value) => parseInt(value, 10),
      1
    )
    .option("-r, --region <string>", "The AWS region", process.env.AWS_REGION)
    .option(
      "-p, --profile <string>",
      "The AWS profile",
      process.env.AWS_PROFILE
    )
    .option(
      "-w, --wait <number>",
      "The wait time (seconds)",
      (value) => parseInt(value, 10), // Parse as an integer
      0 // Default value as number
    )
    .option(
      "-t, --timeout <number>",
      "The timeout for the request (ms)",
      (value) => parseInt(value, 10), // Parse as an integer
      0 // Default value as number
    )
    .option(
      "-v, --verbose",
      "Enable verbose logging",
      (value) => value === "true", // Parse as boolean
      false // Default value as boolean
    )
    .action(async (options) => {
      if (!options.queueUrl || !options.region || !options.profile) {
        program.help();
        process.stderr.write("Queue URL, region, and profile are required\n");
        process.exit(1);
      }
      try {
        const queue = new Queue(options); // No need for queueOptions anymore
        await queue.pull(process.stdout);
      } catch (error) {
        process.stderr.write(`Error pulling messages from queue, ${error}\n`);
        process.exit(1);
      }
    })
    .parse(process.argv);
} catch (error) {
  process.stderr.write(`Error parsing options, ${error}\n`);
  process.exit(1);
}
