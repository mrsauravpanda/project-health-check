
export type Status = "pass" | "warn" | "fail";

export interface CheckResult {
  id: string;
  status: Status;
  message: string;
  score: number;
}

export interface HealthCheck {
  id: string;
  weight: number;
  run(): Promise<CheckResult>;
}
