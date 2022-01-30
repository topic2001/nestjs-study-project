class CustomError extends Error {
  constructor(message: string, public reason?: any) {
    super(message);
    this.reason = JSON.stringify(reason);
  }
}

(global as any).CustomError = CustomError;
