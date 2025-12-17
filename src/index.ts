#!/usr/bin/env node
import { program } from "commander";
import { runChecks } from "./core/runner.js";

program
  .option("--ci", "CI mode")
  .option("--json", "JSON output")
  .parse();

async function main() {
  try {
    await runChecks(program.opts());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Health check failed:", message);
    process.exit(1);
  }
}

main();
