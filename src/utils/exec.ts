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
    const result = execSync(cmd, { stdio: "pipe", timeout: 30000 }).toString();
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
