import { LoggerFactory } from './index'

const logger = LoggerFactory.createLogger();

logger.debug("Debug message");
logger.warn("warn message");
logger.info("info message");
logger.error("error message");
