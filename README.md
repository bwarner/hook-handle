# SQS Pull CLI

**SQS Pull CLI** is a command-line tool designed to retrieve messages from an AWS SQS queue. The tool provides flexibility in managing messages, including optional deletion after processing, verbose logging, and batch retrieval.

---

## Features

- Pull messages from an SQS queue.
- Configure batch size, wait time, and request timeouts.
- Delete messages automatically or keep them in the queue.
- Verbose logging for detailed output.
- Written in TypeScript for type safety and extensibility.

---

## Requirements

- **Node.js** (version 16 or later)
- AWS credentials configured using profiles or environment variables.

---

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/your-username/sqs-pull-cli.git
cd sqs-pull-cli
npm install
