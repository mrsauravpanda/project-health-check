import { execSync } from "child_process";

export const vulnerabilitiesCheck = {
  id: "vulnerabilities",
  weight: 20,
  async run() {
    try {
      // Run npm audit and capture output
      const result = execSync("npm audit --json", { 
        encoding: "utf8",
        stdio: "pipe",
        timeout: 30000
      });
      
      const auditData = JSON.parse(result);
      const vulnerabilityCount = auditData.metadata?.vulnerabilities?.total || 0;
      
      if (vulnerabilityCount === 0) {
        return { 
          id: "vulnerabilities", 
          status: "pass", 
          message: "No vulnerabilities found", 
          score: 20 
        };
      }
      
      return {
        id: "vulnerabilities",
        status: "warn",
        message: `🔐 Vulnerabilities: ${vulnerabilityCount} found`,
        score: 10,
        detailed: {
          suggestion: 'Run "npm audit fix" to address vulnerabilities.'
        }
      };
    } catch (error: any) {
      // npm audit returns exit code 1 when vulnerabilities exist
      if (error.status === 1 && error.stdout) {
        try {
          const auditData = JSON.parse(error.stdout);
          const vulnerabilityCount = auditData.metadata?.vulnerabilities?.total || 0;
          
          return {
            id: "vulnerabilities",
            status: "warn",
            message: `🔐 Vulnerabilities: ${vulnerabilityCount} found`,
            score: 10,
            detailed: {
              suggestion: 'Run "npm audit fix" to address vulnerabilities.'
            }
          };
        } catch (parseError) {
          return { 
            id: "vulnerabilities", 
            status: "fail", 
            message: "Error checking vulnerabilities", 
            score: 0 
          };
        }
      }
      
      return { 
        id: "vulnerabilities", 
        status: "fail", 
        message: "Error checking vulnerabilities", 
        score: 0 
      };
    }
  }
};