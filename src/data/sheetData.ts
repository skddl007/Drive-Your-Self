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