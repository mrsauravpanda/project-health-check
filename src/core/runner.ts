import chalk from "chalk";
import ora from "ora";
import { HealthCheck } from "../types/index.js";
import { checks } from "./registry.js";

interface RunOptions {
  ci?: boolean;
  json?: boolean;
}

const HEALTH_THRESHOLD = 80;

function displayDetailedResult(res: any) {
  const icon = res.status === "pass" ? chalk.green("✔") :
               res.status === "warn" ? chalk.yellow("⚠") :
               chalk.red("✖");
  
  console.log(icon, res.message);
  
  if (res.detailed && res.status !== "pass") {
    if (res.detailed.items) {
      res.detailed.items.forEach((item: string) => {
        console.log(`- ${item}`);
      });
    }
    if (res.detailed.suggestion) {
      console.log(`Suggestion: ${res.detailed.suggestion}`);
    }
  }
}

export async function runChecks(opts: RunOptions) {
  const spinner = opts.ci ? null : ora("Running health checks...").start();
  let total = 0;
  let earned = 0;

  for (const check of checks) {
    try {
      const res = await check.run();
      total += check.weight;
      earned += res.score;

      if (!opts.json) {
        displayDetailedResult(res);
      }
    } catch (error) {
      total += check.weight;
      earned += 0;
      
      if (!opts.json) {
        console.log(chalk.red("✖"), `${check.id} check failed`);
      }
    }
  }

  spinner?.stop();
  
  if (total === 0) {
    console.log("No checks registered");
    return;
  }
  
  const score = Math.round((earned / total) * 100);
  console.log(`Health Score: ${score}/100`);

  if (opts.ci && score < HEALTH_THRESHOLD) process.exit(1);
}
