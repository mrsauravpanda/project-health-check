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
      
      const count = Object.keys(res.dependencies).length;
      return count === 0
        ? { id: "unused-deps", status: "pass", message: "No unused dependencies", score: 15 }
        : { id: "unused-deps", status: "warn", message: `${count} unused dependencies`, score: 7 };
    } catch (error) {
      return { id: "unused-deps", status: "fail", message: "Error checking unused dependencies", score: 0 };
    }
  }
};
