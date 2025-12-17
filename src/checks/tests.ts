import fs from "fs-extra";

export const testCheck = {
  id: "tests",
  weight: 15,
  async run() {
    try {
      const pkg = await fs.readJson("package.json");
      
      if (!pkg || typeof pkg !== 'object') {
        return { id: "tests", status: "fail", message: "Invalid package.json", score: 0 };
      }
      
      const testScript = pkg.scripts?.test;
      const ok = testScript && typeof testScript === 'string' && testScript.trim() !== '';
      
      return ok
        ? { id: "tests", status: "pass", message: "Test script detected", score: 15 }
        : { id: "tests", status: "warn", message: "No test script", score: 7 };
    } catch (error) {
      return { id: "tests", status: "fail", message: "Error reading package.json", score: 0 };
    }
  }
};
