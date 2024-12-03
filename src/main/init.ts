import fs from "fs";
import path from "path";
import { exit } from "process";
import defaultConfig from "../../defaultConfig.json";

/**
 * Initializes the project by creating a default config file.
 */
export default function init() {
  const cwd = process.cwd();
  const outputPath = path.join(cwd, "lilak-config.json");
  const packageJsonPath = path.join(cwd, "package.json");
  let projectName = "";

  //Read the project name so that it can be excluded from analysis
  try {
    const packageJson = fs.readFileSync(packageJsonPath, "utf8");
    const trueJson = JSON.parse(packageJson);
    projectName = trueJson.name;
  } catch (error) {
    console.error("Error reading package.json file. " + error);
    exit(1);
  }

  //For some reason, if the project name is blank, we don't want to add it to the exclusions
  if (projectName) {
    defaultConfig.packageExclusions = [projectName];
  }

  //Now we can write the default config file to the proper location
  try {
    fs.writeFileSync(outputPath, JSON.stringify(defaultConfig, null, 2));
  } catch (error) {
    console.error("Error writing configuration file. " + error);
    exit(1);
  }

  //All done. Let the user know.
  console.log("Successfully initialized lilak with default configuration.");
}
