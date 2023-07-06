
import { createLogger } from './factory-function'

const logger = createLogger();

logger.debug("Debug message");
logger.warn("warn message");
logger.info("info message");
logger.error("error message");
