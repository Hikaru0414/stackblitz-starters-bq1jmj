class Token {
  constructor(
    public type: string,
    public lexeme: string,
    public literal: any,
    public line: number
  ) { }

  toString(): string {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}

class Scanner {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  scanTokens(): Token[] {
    // TODO: Implement the actual scanning logic
    // For now, return an empty list for demonstration
    return [];
  }
}

export { Scanner, Token };
