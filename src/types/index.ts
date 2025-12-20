
export type Status = "pass" | "warn" | "fail";

export interface DetailedInfo {
  items?: string[];
  suggestion?: string;
  details?: Record<string, any>;
}

export interface CheckResult {
  id: string;
  status: Status;
  message: string;
  score: number;
  detailed?: DetailedInfo;
}

export interface HealthCheck {
  id: string;
  weight: number;
  run(): Promise<CheckResult>;
}
