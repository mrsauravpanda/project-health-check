import fs from "fs-extra";

const README_FILES = [
  "README.md", "readme.md", "Readme.md",
  "README.txt", "readme.txt", "Readme.txt",
  "README.rst", "readme.rst", "Readme.rst",
  "README", "readme", "Readme"
];

export const readmeCheck = {
  id: "readme",
  weight: 10,
  async run() {
    try {
      for (const filename of README_FILES) {
        if (await fs.pathExists(filename)) {
          return { id: "readme", status: "pass", message: "README present", score: 10 };
        }
      }
      return { id: "readme", status: "fail", message: "README missing", score: 0 };
    } catch (error) {
      return { id: "readme", status: "fail", message: "Error checking README", score: 0 };
    }
  }
};
