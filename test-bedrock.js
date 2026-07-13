const {
  BedrockRuntimeClient,
  ConverseCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({
  region: "us-east-1",
});

async function main() {
  try {
    const command = new ConverseCommand({
      modelId: "amazon.nova-lite-v1:0",
      messages: [
        {
          role: "user",
          content: [
            {
              text: "Say hello in one sentence.",
            },
          ],
        },
      ],
    });

    const response = await client.send(command);

    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();
