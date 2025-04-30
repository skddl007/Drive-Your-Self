import basicToAdvanced from './basicToAdvanced.json';
import sdeSheet from './sdeSheet.json';
import { Problem } from '../types';

export function getAdvancedSheetData(): Problem[] {
  return basicToAdvanced.problems;
}

export function getSdeSheetData(): Problem[] {
  return sdeSheet.problems;
}