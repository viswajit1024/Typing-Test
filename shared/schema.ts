import { z } from "zod";

export interface TextPassage {
  id: number;
  content: string;
  difficulty: string;
  length: number;
}

export interface TestResult {
  id: number;
  wpm: number;
  accuracy: number;
  errors: number;
  timeSeconds: number;
  difficulty: string;
  passageId: number;
}

export const insertTestResultSchema = z.object({
  wpm: z.number().min(0),
  accuracy: z.number().min(0).max(100),
  errors: z.number().min(0),
  timeSeconds: z.number().min(0),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  passageId: z.number(),
});

export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
