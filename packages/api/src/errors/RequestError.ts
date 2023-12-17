type NewRequestError =
  | string
  | {
      errors: unknown | null;
      statusCode: number;
      message: string;
    };

class RequestError extends Error {
  public statusCode: number;
  public errors: unknown | null;

  constructor(err: NewRequestError) {
    if (typeof err === 'string') {
      super(err);

      this.statusCode = 500;
    } else {
      super(err.message);

      this.message = err.message;
      this.statusCode = err.statusCode;
      this.errors = err.errors;
    }

    this.name = 'RequestError';
  }
}

export default RequestError;
