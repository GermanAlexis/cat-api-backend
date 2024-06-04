import 'dotenv/config';
import * as joi from 'joi';

interface Envs {
  PORT: number;
  JWT_SECRET: string;
  DATABASE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation ${error.message}`);
}

const envVars: Envs = value;

export const envs = {
  ports: envVars.PORT,
  DatabaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
};
