import fs from "fs-extra";

const LICENSE_FILES = [
  "LICENSE", "license", "License",
  "LICENSE.md", "license.md", "License.md",
  "LICENSE.txt", "license.txt", "License.txt"
];

export const licenseCheck = {
  id: "license",
  weight: 10,
  async run() {
    try {
      for (const filename of LICENSE_FILES) {
        if (await fs.pathExists(filename)) {
          return { id: "license", status: "pass", message: "LICENSE present", score: 10 };
        }
      }
      return { id: "license", status: "fail", message: "LICENSE missing", score: 0 };
    } catch (error) {
      return { id: "license", status: "fail", message: "Error checking LICENSE", score: 0 };
    }
  }
};
