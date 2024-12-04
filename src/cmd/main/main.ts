import { join } from "path";
import { tmpdir } from "os";
import { exec } from "child_process";
import { LilakConfig } from "../../types";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  unlinkSync,
} from "fs";

/**
 * This is the main function, but is called by index.ts
 */

export default function main() {
  let config: LilakConfig = {} as LilakConfig;
  const cwd = process.cwd();
  const outputDirectory = join(cwd, "licensing");
  const ackPath = join(cwd, outputDirectory, "acknowledgements.json");

  //Step 0: Read the configuration file
  try {
    const configPath = join(cwd, "lilak-config.json");
    const configContent = readFileSync(configPath, "utf8");
    config = JSON.parse(configContent);
  } catch (error) {
    console.error("Error reading configuration file. " + error);
    process.exit(1);
  }

  //Step 1: Create directory for output
  if (!existsSync(outputDirectory)) {
    try {
      mkdirSync(outputDirectory);
    } catch (error) {
      console.error("Error creating output directory. " + error);
      process.exit(1);
    }
  }

  //Step 2: Run compliance
  const complianceCommand = `license-compliance \\
    --exclude "${config.complianceExclusions.join(";")}"\\
    --allow "${config.allowedLicenses.join(";")}"`;

  exec(complianceCommand, (error, _, stderr) => {
    if (error) {
      console.error(`Error running compliance check: ${error.message}`);
      process.exit(1);
    }

    if (stderr) {
      console.error(`Error running compliance check: ${stderr}`);
      process.exit(1);
    }
  });

  //Step 3: Create temp file to hold input for license-checker-rseidelsohn
  const tempCSV = join(tmpdir(), "lilak-temp.csv");
  try {
    writeFileSync(tempCSV, config.attributes.join());
  } catch (error) {
    console.error("Error writing temp file. " + error);
    process.exit(1);
  }

  //Step 4: Generate license acknowledgment
  const ackCommand = `license-checker-rseidelsohn \\
    --json \\
    --limitAttributes "${config.attributes.join()}" \\
    --out ${ackPath} \\
    --customPath ${tempCSV} \\
    --excludePackagesStartingWith "${config.packageExclusions.join(";")}"`;

  exec(ackCommand, (error, _, stderr) => {
    unlinkSync(tempCSV);
    if (error || stderr) {
      const message = error ? error.message : stderr;
      console.error("Error generating acknowledgments: " + message);
      process.exit(1);
    }
  });
}
