import { ChevronDown, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useProblems } from '../contexts/ProblemContext';
import { Problem } from '../types/problem';
import { NoteModal } from './NoteModal';

interface ProblemAccordionProps {
  title: string;
  problems: Problem[];
}

export function ProblemAccordion({ title, problems: initialProblems }: ProblemAccordionProps) {
  const { completedProblems, markProblemCompleted, getProblemNote, saveProblemNote } = useProblems();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [starredProblems, setStarredProblems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('starredProblems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [problems, setProblems] = useState<Problem[]>(initialProblems);

  // Update problems when initialProblems changes
  useEffect(() => {
    // Update problems with notes from the context
    const updatedProblems = initialProblems.map(p => ({
      ...p,
      Note: getProblemNote(p.Problem) || p.Note
    }));
    setProblems(updatedProblems);
  }, [initialProblems, getProblemNote]);

  const getPlatformIcon = (url: string) => {
    if (url.includes('leetcode.com')) {
      return (
        <svg className="w-5 h-5 text-[#FFA116]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
      );
    } else if (url.includes('geeksforgeeks.org') || url.includes('bit.ly')) {
      return (
        <svg className="w-5 h-5 text-[#2F8D46]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.99 3.95A2.5 2.5 0 0 0 19.5 3H4.5A2.5 2.5 0 0 0 2 5.5v13A2.5 2.5 0 0 0 4.5 21h15a2.5 2.5 0 0 0 2.5-2.5v-13a2.5 2.5 0 0 0-1.01-2.55zM19.5 19h-15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5zm-2.5-11h-10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0 4h-10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0 4h-10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
        </svg>
      );
    }
    return null;
  };

  const handleNoteClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setIsNoteModalOpen(true);
  };

  const handleNoteSave = async (note: string) => {
    if (selectedProblem) {
      try {
        if (!isAuthenticated) {
          // Redirect to login if not authenticated
          navigate('/login');
          return;
        }

        // Save note to database
        await saveProblemNote(selectedProblem.Problem, note);

        // Update the problem in the problems array with the new note
        const updatedProblems = problems.map(p => {
          if (p.Problem === selectedProblem.Problem) {
            return { ...p, Note: note };
          }
          return p;
        });

        // Update problems
        setProblems(updatedProblems);

        // Close the modal
        setIsNoteModalOpen(false);
      } catch (error) {
        console.error('Error saving note:', error);
        alert('Failed to save note. Please try again.');
      }
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-card/90 rounded-lg text-left transition-colors"
      >
        <div className="flex flex-col gap-2 flex-grow">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-grow bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${(problems.filter(p => completedProblems.includes(p.Problem)).length / problems.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {problems.filter(p => completedProblems.includes(p.Problem)).length}/{problems.length}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ml-4 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="p-3 text-left text-sm font-medium text-muted-foreground">Problem</th>
                  <th className="p-3 text-left text-sm font-medium text-muted-foreground">Practice</th>
                  <th className="p-3 text-left text-sm font-medium text-muted-foreground">Note</th>
                  <th className="p-3 text-left text-sm font-medium text-muted-foreground">Revision</th>
                  <th className="p-3 text-left text-sm font-medium text-muted-foreground">Difficulty</th>
                  <th className="p-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem: Problem, index: number) => (
                  <tr key={`${problem.id}-${index}`} className="border-b border-border">
                    <td className="p-3">
                      <button
                        onClick={() => markProblemCompleted(problem.Problem)}
                        className={`w-5 h-5 rounded border ${completedProblems.includes(problem.Problem) ? 'bg-green-500 border-green-500' : 'border-muted-foreground hover:border-white'} transition-colors flex items-center justify-center`}
                      >
                        {completedProblems.includes(problem.Problem) && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    </td>
                    <td className="p-3 text-sm">{problem.Problem}</td>
                    <td className="p-3">
                      {isAuthenticated ? (
                        <a
                          href={problem['Practice Link']}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                        >
                          {getPlatformIcon(problem['Practice Link'])}
                          <span>Practice</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => navigate('/login')}
                          className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                        >
                          {getPlatformIcon(problem['Practice Link'])}
                          <span>Login to Practice</span>
                        </button>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleNoteClick(problem)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-2 ${problem.Note ? 'bg-primary/10 hover:bg-primary/20' : 'bg-secondary hover:bg-secondary/80'}`}
                      >
                        {problem.Note ? (
                          <>
                            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>View note</span>
                          </>
                        ) : (
                          'Add note...'
                        )}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          const newStarred = new Set(starredProblems);
                          if (starredProblems.has(problem.Problem)) {
                            newStarred.delete(problem.Problem);
                          } else {
                            newStarred.add(problem.Problem);
                          }
                          setStarredProblems(newStarred);
                          localStorage.setItem('starredProblems', JSON.stringify(Array.from(newStarred)));
                        }}
                        className={`p-1.5 rounded-full hover:bg-secondary transition-colors ${starredProblems.has(problem.Problem) ? 'text-yellow-500' : 'text-muted-foreground'}`}
                      >
                        <Star className="w-5 h-5" fill={starredProblems.has(problem.Problem) ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium
                          ${
                            problem.Difficulty === 'Easy'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                              : problem.Difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                          }
                        `}
                      >
                        {problem.Difficulty}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{problem['Company Name'] || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleNoteSave}
        initialNote={selectedProblem?.Note}
      />
    </div>
  );
}
