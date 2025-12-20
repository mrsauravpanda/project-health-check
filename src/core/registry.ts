import { readmeCheck } from "../checks/readme.js";
import { licenseCheck } from "../checks/license.js";
import { gitignoreCheck } from "../checks/gitignore.js";
import { testCheck } from "../checks/tests.js";
import { outdatedDepsCheck } from "../checks/outdated-deps.js";
import { unusedDepsCheck } from "../checks/unused-deps.js";
import { largeFilesCheck } from "../checks/large-files.js";
import { scriptsCheck } from "../checks/scripts.js";
import { vulnerabilitiesCheck } from "../checks/vulnerabilities.js";

export const checks = [
  readmeCheck,
  licenseCheck,
  gitignoreCheck,
  testCheck,
  outdatedDepsCheck,
  vulnerabilitiesCheck,
  unusedDepsCheck,
  largeFilesCheck,
  scriptsCheck
];
