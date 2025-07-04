import { type TextPassage, type TestResult, type InsertTestResult } from "@shared/schema";

export interface IStorage {
  getTextPassagesByDifficulty(difficulty: string): Promise<TextPassage[]>;
  getRandomTextPassage(difficulty: string): Promise<TextPassage | undefined>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getRecentTestResults(limit?: number): Promise<TestResult[]>;
}

export class MemStorage implements IStorage {
  private textPassages: Map<number, TextPassage>;
  private testResults: Map<number, TestResult>;
  private currentPassageId: number;
  private currentResultId: number;

  constructor() {
    this.textPassages = new Map();
    this.testResults = new Map();
    this.currentPassageId = 1;
    this.currentResultId = 1;
    
    // Initialize with default text passages
    this.initializeTextPassages();
  }

  private initializeTextPassages() {
    const defaultPassages: Omit<TextPassage, 'id'>[] = [
      // Easy passages
      {
        content: "The quick brown fox jumps over the lazy dog. This simple sentence contains every letter of the alphabet.",
        difficulty: "easy",
        length: 98
      },
      {
        content: "A journey of a thousand miles begins with a single step. Practice makes perfect in everything we do.",
        difficulty: "easy",
        length: 98
      },
      {
        content: "The sun shines brightly in the clear blue sky. Birds sing beautiful songs in the morning air.",
        difficulty: "easy",
        length: 93
      },
      {
        content: "Reading books opens doors to new worlds and adventures. Knowledge is the key to understanding life.",
        difficulty: "easy",
        length: 103
      },
      {
        content: "Music has the power to heal hearts and bring people together in harmony and peace.",
        difficulty: "easy",
        length: 85
      },
      
      // Medium passages
      {
        content: "Technology has revolutionized the way we communicate and work. Digital transformation affects every aspect of modern life, from education to healthcare.",
        difficulty: "medium",
        length: 154
      },
      {
        content: "Climate change represents one of humanity's greatest challenges. Scientists worldwide collaborate to develop sustainable solutions for our planet's future.",
        difficulty: "medium",
        length: 154
      },
      {
        content: "Artificial intelligence and machine learning algorithms continue to evolve rapidly, reshaping industries and creating new opportunities for innovation.",
        difficulty: "medium",
        length: 155
      },
      {
        content: "Global economics involves complex interactions between nations, currencies, and markets that influence international trade and development policies.",
        difficulty: "medium",
        length: 158
      },
      {
        content: "Space exploration has revealed countless mysteries about our universe while advancing technological capabilities and inspiring future generations.",
        difficulty: "medium",
        length: 156
      },
      
      // Hard passages
      {
        content: "Quantum computing leverages quantum-mechanical phenomena to process information exponentially faster than classical computers for specific computational problems.",
        difficulty: "hard",
        length: 164
      },
      {
        content: "Cryptocurrency and blockchain technology have disrupted traditional financial systems, introducing decentralized digital currencies and smart contracts.",
        difficulty: "hard",
        length: 155
      },
      {
        content: "Neuroplasticity demonstrates the brain's remarkable ability to reorganize and adapt throughout life, forming new neural connections and pathways.",
        difficulty: "hard",
        length: 150
      },
      {
        content: "Biotechnology encompasses interdisciplinary approaches combining biological systems with engineering principles to develop innovative medical treatments and solutions.",
        difficulty: "hard",
        length: 167
      },
      {
        content: "Theoretical physics explores fundamental questions about reality, investigating concepts like string theory, dark matter, and the nature of spacetime itself.",
        difficulty: "hard",
        length: 159
      }
    ];

    defaultPassages.forEach(passage => {
      const id = this.currentPassageId++;
      this.textPassages.set(id, { ...passage, id });
    });
  }



  async getTextPassagesByDifficulty(difficulty: string): Promise<TextPassage[]> {
    return Array.from(this.textPassages.values()).filter(
      passage => passage.difficulty === difficulty
    );
  }

  async getRandomTextPassage(difficulty: string): Promise<TextPassage | undefined> {
    const passages = await this.getTextPassagesByDifficulty(difficulty);
    if (passages.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * passages.length);
    return passages[randomIndex];
  }

  async createTestResult(insertResult: InsertTestResult): Promise<TestResult> {
    const id = this.currentResultId++;
    const result: TestResult = { ...insertResult, id };
    this.testResults.set(id, result);
    return result;
  }

  async getRecentTestResults(limit: number = 10): Promise<TestResult[]> {
    const results = Array.from(this.testResults.values());
    return results.slice(-limit).reverse();
  }
}

export const storage = new MemStorage();
