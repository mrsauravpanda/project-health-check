import fs from "fs-extra";

export const gitignoreCheck = {
  id: "gitignore",
  weight: 5,
  async run() {
    try {
      const ok = await fs.pathExists(".gitignore");
      return ok
        ? { id: "gitignore", status: "pass", message: ".gitignore present", score: 5 }
        : { id: "gitignore", status: "warn", message: ".gitignore missing", score: 2 };
    } catch (error) {
      return { id: "gitignore", status: "fail", message: "Error checking .gitignore", score: 0 };
    }
  }
};
