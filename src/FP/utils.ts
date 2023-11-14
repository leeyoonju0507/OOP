import readline from 'readline';

export const inputReceiver = (prompt: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(prompt, (userInput) => {
      rl.close();
      resolve(userInput);
    });
  });
};
