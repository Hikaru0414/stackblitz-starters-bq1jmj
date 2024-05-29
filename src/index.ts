import * as fs from 'fs';
import * as readline from 'readline';
import { Scanner, Token } from './scanner';

class Lox {
  // private static hadError: boolean = false;

  static main(args: string[]): void {
    if (args.length > 1) {
      console.log('Usage: tlox [script]');
      process.exit(64);
    } else if (args.length === 1) {
      this.runFile(args[0]);
    } else {
      this.runPrompt();
    }
  }

  private static async runFile(filePath: string): Promise<void> {
    try {
      const bytes = await fs.promises.readFile(filePath);
      const content = bytes.toString('utf-8');
      this.run(content);
    } catch (err) {
      console.error(`Could not read file: ${filePath}`);
      process.exit(65);
    }
  }

  private static runPrompt(): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const prompt = () => {
      rl.question('> ', (line) => {
        if (line === null) {
          rl.close();
        } else {
          this.run(line);
          prompt();
        }
      });
    };

    prompt();

    rl.on('close', () => {
      console.log('Goodbye!');
      process.exit(0);
    });
  }

  private static run(source: string): void {
    const scanner = new Scanner(source);
    const tokens: Token[] = scanner.scanTokens();

    // For now, just print the tokens.
    for (const token of tokens) {
      console.log(token.toString());
    }
  }

  // static error(line: number, message: string): void {
  //     this.report(line, "", message);
  // }

  // private static report(line: number, where: string, message: string): void {
  //     console.error(`[line ${line}] Error${where}: ${message}`);
  //     this.hadError = true;
  // }
}

// エントリーポイントの設定
if (require.main === module) {
  Lox.main(process.argv.slice(2));
}
