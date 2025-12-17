import { execSync } from "child_process";

const ALLOWED_COMMANDS = ['npm outdated --json', 'npm list --json'];

function sanitizeForLog(input: string): string {
  return input.replace(/[\r\n]/g, ' ').substring(0, 100);
}

export function execJSON(cmd: string) {
  try {
    if (!ALLOWED_COMMANDS.includes(cmd)) {
      throw new Error('Command not allowed');
    }
    
    // npm outdated returns exit code 1 when outdated packages exist, so we need to handle this
    const options = { 
      stdio: "pipe" as const, 
      timeout: 30000,
      encoding: "utf8" as const
    };
    
    if (cmd === 'npm outdated --json') {
      // For npm outdated, ignore exit code and capture output
      try {
        const result = execSync(cmd, options);
        return JSON.parse(result);
      } catch (error: any) {
        // npm outdated returns exit code 1 when packages are outdated
        if (error.status === 1 && error.stdout) {
          try {
            return JSON.parse(error.stdout);
          } catch (parseError) {
            console.warn(`JSON parsing failed for npm outdated output`);
            return null;
          }
        }
        throw error; // Re-throw if it's a different error
      }
    }
    
    const result = execSync(cmd, options);
    return JSON.parse(result);
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      console.warn(`JSON parsing failed for command: ${sanitizeForLog(cmd)}`);
    } else if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      console.warn(`Command not found: ${sanitizeForLog(cmd)}`);
    } else {
      console.warn(`Command execution failed: ${sanitizeForLog(cmd)}`);
    }
    return null;
  }
}
