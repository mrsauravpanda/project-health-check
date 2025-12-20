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
      
      const outdatedPackages = Object.keys(res);
      const items = outdatedPackages.map(pkg => 
        `${pkg}: current ${res[pkg].current}, latest ${res[pkg].latest}`
      );
      
      return {
        id: "outdated-deps",
        status: "warn",
        message: `📦 Outdated dependencies: ${outdatedPackages.length}`,
        score: 7,
        detailed: {
          items,
          suggestion: 'Run "npm update" to update dependencies.'
        }
      };
    } catch (error) {
      return { id: "outdated-deps", status: "fail", message: "Error checking dependencies", score: 0 };
    }
  }
};
