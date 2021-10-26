import { ErrorRequestHandler } from 'express';
import { logger } from 'utils/logger';

interface IntError {
  error: string;
  name: string;
  message: string;
  description?: string;
  stack: string;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, name, message, error, stack, description } = err;
  const errorInfo: IntError = {
    error,
    name,
    message,
    stack,
  };
  if (description) {
    errorInfo.description = description;
  }
  logger.error(errorInfo.message);
  res.status(statusCode || 500).json(errorInfo);
};
