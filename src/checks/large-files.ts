import fs from "fs-extra";
import path from "path";

const FILE_SIZE_LIMIT_MB = 5;
const EXCLUDED_DIRS = ['node_modules', '.git', 'dist', 'build'];

async function checkDirectoryRecursively(dir: string, limit: number): Promise<boolean> {
  try {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      if (EXCLUDED_DIRS.includes(item) || item.startsWith('.')) continue;
      
      // Prevent path traversal by ensuring we stay within the project
      const safePath = path.resolve(dir, path.basename(item));
      if (!safePath.startsWith(path.resolve(dir))) continue;
      
      try {
        const stat = await fs.stat(safePath);
        
        if (stat.isFile() && stat.size > limit) {
          return true;
        } else if (stat.isDirectory()) {
          const found = await checkDirectoryRecursively(safePath, limit);
          if (found) return true;
        }
      } catch (itemError) {
        // Skip inaccessible files/directories
        continue;
      }
    }
  } catch (dirError) {
    // Skip inaccessible directories
    return false;
  }
  
  return false;
}

export const largeFilesCheck = {
  id: "large-files",
  weight: 15,
  async run() {
    const limit = FILE_SIZE_LIMIT_MB * 1024 * 1024;
    
    try {
      const found = await checkDirectoryRecursively(".", limit);
      return !found
        ? { id: "large-files", status: "pass", message: "No large files", score: 15 }
        : { id: "large-files", status: "warn", message: "Large files detected", score: 7 };
    } catch (error) {
      return { id: "large-files", status: "fail", message: "Error checking file sizes", score: 0 };
    }
  }
};
