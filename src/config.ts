import packageJson from "../package.json";

export type AvailableEnvs = "test" | "development" | "production";
export type ClientOrigins = Record<AvailableEnvs, string>;

export type ConfigType = {
  version: string;
  name: string;
  nodeEnv: AvailableEnvs;
  port: string;
  clientOrigins: ClientOrigins;
};

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config: ConfigType = {
  version: packageJson.version,
  name: packageJson.name,

  nodeEnv: (process.env["NODE_ENV"] as AvailableEnvs) ?? "development",
  port: process.env["PORT"] ?? "3000",

  clientOrigins: {
    test: process.env["DEV_ORIGIN"] ?? "*",
    development: process.env["DEV_ORIGIN"] ?? "*",
    production: process.env["PROD_ORIGIN"] ?? "none",
  },
};

export default config;
