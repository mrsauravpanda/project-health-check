import fs from "fs-extra";

export const scriptsCheck = {
  id: "scripts",
  weight: 15,
  async run() {
    try {
      const pkg = await fs.readJson("package.json");
      
      if (!pkg || typeof pkg !== 'object') {
        return { id: "scripts", status: "fail", message: "Invalid package.json", score: 0 };
      }
      
      const scripts = pkg.scripts || {};
      const ok = scripts.build && scripts.test;
      
      return ok
        ? { id: "scripts", status: "pass", message: "Good script coverage", score: 15 }
        : { id: "scripts", status: "warn", message: "Missing important scripts", score: 7 };
    } catch (error) {
      return { id: "scripts", status: "fail", message: "Error reading package.json", score: 0 };
    }
  }
};
