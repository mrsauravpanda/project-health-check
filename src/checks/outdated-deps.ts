import { execJSON } from "../utils/exec.js";

export const outdatedDepsCheck = {
  id: "outdated-deps",
  weight: 15,
  async run() {
    try {
      const res = execJSON("npm outdated --json");
      
      if (!res || Object.keys(res).length === 0) {
        return { id: "outdated-deps", status: "pass", message: "Dependencies up to date", score: 15 };
      }
      
      return {
        id: "outdated-deps",
        status: "warn",
        message: `${Object.keys(res).length} outdated dependencies`,
        score: 7
      };
    } catch (error) {
      return { id: "outdated-deps", status: "fail", message: "Error checking dependencies", score: 0 };
    }
  }
};
