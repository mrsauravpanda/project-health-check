import fs from "fs-extra";
import path from "path";

const FILE_SIZE_LIMIT_MB = 5;
const EXCLUDED_DIRS = ['node_modules', '.git', 'dist', 'build'];

interface LargeFile {
  path: string;
  size: number;
}

async function checkDirectoryRecursively(dir: string, limit: number, largeFiles: LargeFile[] = []): Promise<LargeFile[]> {
  try {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      if (EXCLUDED_DIRS.includes(item) || item.startsWith('.')) continue;
      
      const safePath = path.resolve(dir, path.basename(item));
      if (!safePath.startsWith(path.resolve(dir))) continue;
      
      try {
        const stat = await fs.stat(safePath);
        
        if (stat.isFile() && stat.size > limit) {
          largeFiles.push({ path: path.relative(process.cwd(), safePath), size: stat.size });
        } else if (stat.isDirectory()) {
          await checkDirectoryRecursively(safePath, limit, largeFiles);
        }
      } catch (itemError) {
        continue;
      }
    }
  } catch (dirError) {
    return largeFiles;
  }
  
  return largeFiles;
}

function formatFileSize(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export const largeFilesCheck = {
  id: "large-files",
  weight: 15,
  async run() {
    const limit = FILE_SIZE_LIMIT_MB * 1024 * 1024;
    
    try {
      const largeFiles = await checkDirectoryRecursively(".", limit);
      
      if (largeFiles.length === 0) {
        return { id: "large-files", status: "pass", message: "No large files", score: 15 };
      }
      
      const items = largeFiles.map(f => `${f.path} (${formatFileSize(f.size)})`);
      
      return {
        id: "large-files",
        status: "warn",
        message: `📁 Large file${largeFiles.length > 1 ? 's' : ''}: ${items[0]}`,
        score: 7,
        detailed: {
          items: largeFiles.length > 1 ? items : undefined,
          suggestion: 'Remove or compress large files if not needed.'
        }
      };
    } catch (error) {
      return { id: "large-files", status: "fail", message: "Error checking file sizes", score: 0 };
    }
  }
};
