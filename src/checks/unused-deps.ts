import depcheck from "depcheck";

export const unusedDepsCheck = {
  id: "unused-deps",
  weight: 15,
  async run() {
    try {
      const res = await depcheck(process.cwd(), {});
      
      if (!res || typeof res.dependencies !== 'object' || res.dependencies === null) {
        return { id: "unused-deps", status: "fail", message: "Error analyzing dependencies", score: 0 };
      }
      
      const unusedDeps = Object.keys(res.dependencies);
      const count = unusedDeps.length;
      
      if (count === 0) {
        return { id: "unused-deps", status: "pass", message: "No unused dependencies", score: 15 };
      }
      
      return {
        id: "unused-deps",
        status: "warn",
        message: `📦 Unused dependencies: ${count}`,
        score: 7,
        detailed: {
          items: unusedDeps,
          suggestion: 'Remove unused packages with "npm uninstall <package>".'
        }
      };
    } catch (error) {
      return { id: "unused-deps", status: "fail", message: "Error checking unused dependencies", score: 0 };
    }
  }
};
