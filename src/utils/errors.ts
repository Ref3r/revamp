export class ServiceError extends Error {
  success: boolean;
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.success = false;
    this.name = "ServiceError";
  }
}
