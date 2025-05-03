// Import will be done dynamically in the function
import { Problem } from '../types';
import basicToAdvanced from './basicToAdvanced.json';
import sdeSheet from './sdeSheet.json';

export function getAdvancedSheetData(): Problem[] {
  // Convert the JSON data to match the Problem interface
  return (basicToAdvanced as any[]).map((item, index) => ({
    id: item.Problem, // Use the problem name as the ID for consistency
    title: item.Problem,
    difficulty: item.Difficulty.toLowerCase(),
    topic: item.Title,
    url: item['Practice Link'],
    companies: item['Company Name'] ? [item['Company Name']] : []
  }));
}

export function getSdeSheetData(): Problem[] {
  // Convert the JSON data to match the Problem interface
  return (sdeSheet as any[]).map((item, index) => ({
    id: item.Problem, // Use the problem name as the ID for consistency
    title: item.Problem,
    difficulty: item.Difficulty.toLowerCase(),
    topic: item.Title,
    url: item['Practice Link'],
    companies: item['Company Name'] ? [item['Company Name']] : []
  }));
}

export async function getInterviewQuestionsData(): Promise<Problem[]> {
  try {
    // Dynamically import the interview questions data
    const interviewQuestionsModule = await import('../../public/data/Interview Questions - Batch 2026.json');
    const interviewQuestions = interviewQuestionsModule.default;

    // Group questions by company to create topics
    const questionsByCompany: Record<string, any[]> = {};

    interviewQuestions.forEach((item: any) => {
      const company = item.Company?.trim() || 'Other';
      if (!questionsByCompany[company]) {
        questionsByCompany[company] = [];
      }
      questionsByCompany[company].push(item);
    });

    // Convert the interview questions data to match the Problem interface
    const result: Problem[] = [];

    Object.entries(questionsByCompany).forEach(([company, questions], companyIndex) => {
      questions.forEach((item: any, questionIndex) => {
        // Clean up and normalize the difficulty
        const rawDifficulty = (item.hardness || '').toString().trim();
        const difficulty = ['Easy', 'Medium', 'Hard'].includes(rawDifficulty)
          ? rawDifficulty.toLowerCase()
          : 'medium';

        // Process company names - split by comma and trim if needed
        const companyNames = item.Company
          ? item.Company.split(',').map((c: string) => c.trim()).filter((c: string) => c)
          : [];

        result.push({
          id: `interview-${companyIndex}-${questionIndex}`,
          title: item['Question Name'],
          difficulty: difficulty,
          topic: company, // Use company as the topic for grouping
          url: item.Link && item.Link !== 'Link' ? item.Link : '#',
          companies: companyNames
        });
      });
    });

    return result;
  } catch (error) {
    console.error('Error loading interview questions data:', error);
    return [];
  }
}