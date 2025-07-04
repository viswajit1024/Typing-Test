import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTestResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get random text passage by difficulty
  app.get("/api/passages/:difficulty", async (req, res) => {
    try {
      const { difficulty } = req.params;
      
      if (!["easy", "medium", "hard"].includes(difficulty)) {
        return res.status(400).json({ message: "Invalid difficulty level" });
      }

      const passage = await storage.getRandomTextPassage(difficulty);
      
      if (!passage) {
        return res.status(404).json({ message: "No passages found for this difficulty" });
      }

      res.json(passage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch passage" });
    }
  });

  // Get all passages by difficulty
  app.get("/api/passages", async (req, res) => {
    try {
      const { difficulty } = req.query;
      
      if (!difficulty || !["easy", "medium", "hard"].includes(difficulty as string)) {
        return res.status(400).json({ message: "Valid difficulty parameter required" });
      }

      const passages = await storage.getTextPassagesByDifficulty(difficulty as string);
      res.json(passages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch passages" });
    }
  });

  // Save test result
  app.post("/api/results", async (req, res) => {
    try {
      const validatedData = insertTestResultSchema.parse(req.body);
      const result = await storage.createTestResult(validatedData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid test result data",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to save test result" });
    }
  });

  // Get recent test results
  app.get("/api/results", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const results = await storage.getRecentTestResults(limit);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
