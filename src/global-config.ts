import packageJson from "../package.json";

export type ConfigValue = {
  appName: string;
  assetDir: string;
};

export const CONFIG: ConfigValue = {
  appName: packageJson.name,
  assetDir: "/assets",
};
