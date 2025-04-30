import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';
import { ProblemAccordion } from '../components/ProblemAccordion';
import { Problem, Difficulty } from '../types/problem';
import { useProblems } from '../contexts/ProblemContext';
import DashboardStats from '../components/dashboard/DashboardStats';

const SheetPage: React.FC = () => {
  const { sheetId } = useParams<{ sheetId: string }>();
  const { completedProblems } = useProblems();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate problem statistics
  const completedCount = problems.filter(p => completedProblems.includes(p.id)).length;
  
  // Calculate difficulty statistics
  const easyProblems = problems.filter(p => p.Difficulty?.toLowerCase() === 'easy');
  const mediumProblems = problems.filter(p => p.Difficulty?.toLowerCase() === 'medium');
  const hardProblems = problems.filter(p => p.Difficulty?.toLowerCase() === 'hard');
  
  const easyTotal = easyProblems.length;
  const mediumTotal = mediumProblems.length;
  const hardTotal = hardProblems.length;
  
  const easyCompleted = easyProblems.filter(p => completedProblems.includes(p.id)).length;
  const mediumCompleted = mediumProblems.filter(p => completedProblems.includes(p.id)).length;
  const hardCompleted = hardProblems.filter(p => completedProblems.includes(p.id)).length;

  const getSheetTitle = () => {
    switch (sheetId) {
      case 'sde':
        return 'SDE Sheet';
      case 'advanced':
        return 'Basic to Advanced Sheet';
      default:
        return 'Problem Sheet';
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let jsonFile = '';
        if (sheetId === 'sde') {
          jsonFile = '/src/data/sdeSheet.json';
        } else if (sheetId === 'advanced') {
          jsonFile = '/src/data/basicToAdvanced.json';
        } else {
          throw new Error('Invalid sheet type');
        }

        const response = await fetch(jsonFile);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Clean and normalize the data
        const cleanedData = data.map((problem: Problem, index: number) => {
          // Clean up and validate difficulty
          const rawDifficulty = (problem.Difficulty || '').toString().replace(/[",']/g, '').trim();
          const difficulty: Difficulty = ['Easy', 'Medium', 'Hard'].includes(rawDifficulty as Difficulty)
            ? rawDifficulty as Difficulty
            : 'Medium';

          return {
            ...problem,
            id: `${sheetId}-${index + 1}`,
            Difficulty: difficulty,
            Title: problem.Title?.trim() || 'Uncategorized',
            Problem: problem.Problem?.trim() || 'Untitled Problem',
            'Practice Link': problem['Practice Link']?.split(',')[0]?.trim() || '#',
            'Company Name': problem['Company Name']?.split(',')[0]?.trim() || 'Not specified'
          };
        });

        setProblems(cleanedData);
        setFilteredProblems(cleanedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problems');
        console.error('Error loading problems:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [sheetId]);

  // Apply difficulty filter when changed
  useEffect(() => {
    let result = [...problems];
    
    if (selectedDifficulty) {
      result = result.filter(problem => {
        const problemDifficulty = problem.Difficulty?.trim();
        return problemDifficulty && problemDifficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      });
    }
    
    setFilteredProblems(result);
  }, [selectedDifficulty, problems]);

  // Group filtered problems by Title (topic)
  const problemsByTopic = filteredProblems.reduce((acc, problem) => {
    // Skip empty topics
    if (!problem.Title.trim()) return acc;
    
    if (!acc[problem.Title]) {
      acc[problem.Title] = [];
    }
    acc[problem.Title].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);
  
  // Sort topics alphabetically
  const sortedTopics = Object.entries(problemsByTopic).sort((a, b) => 
    a[0].localeCompare(b[0])
  );

  const handleDifficultyFilter = (difficulty: Difficulty | null) => {
    // If clicking the already selected difficulty, clear the filter
    if (difficulty === selectedDifficulty) {
      setSelectedDifficulty(null);
    } else {
      // Otherwise, set the new difficulty filter
      setSelectedDifficulty(difficulty);
    }
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {getSheetTitle()}
            </h1>
            <p className="text-muted-foreground">
              {filteredProblems.length} problem{filteredProblems.length === 1 ? '' : 's'} total
              {selectedDifficulty && ` • ${selectedDifficulty} difficulty`}
            </p>
          </div>
        </div>

        {/* Problem Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardStats
            title="Total Progress"
            count={completedCount}
            total={problems.length}
            percentage={Math.round((completedCount / problems.length) * 100) || 0}
            color="blue"
          />
          <DashboardStats
            title="Easy Problems"
            count={easyCompleted}
            total={easyTotal}
            percentage={Math.round((easyCompleted / easyTotal) * 100) || 0}
            color="green"
          />
          <DashboardStats
            title="Medium Problems"
            count={mediumCompleted}
            total={mediumTotal}
            percentage={Math.round((mediumCompleted / mediumTotal) * 100) || 0}
            color="yellow"
          />
          <DashboardStats
            title="Hard Problems"
            count={hardCompleted}
            total={hardTotal}
            percentage={Math.round((hardCompleted / hardTotal) * 100) || 0}
            color="red"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <button
            onClick={toggleMobileFilters}
            className="flex items-center gap-2 bg-card hover:bg-card/90 px-4 py-2 rounded-lg shadow-sm text-foreground"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        <div className={`${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-20 space-y-4">
            <div className="bg-card rounded-lg p-4">
              <h2 className="font-semibold mb-4 text-foreground">Difficulty</h2>
              <div className="space-y-2">
                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((difficulty) => {
                  const count = problems.filter(p => 
                    p.Difficulty?.toLowerCase() === difficulty.toLowerCase()
                  ).length;
                  
                  return (
                    <button
                      key={difficulty}
                      onClick={() => handleDifficultyFilter(difficulty)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                        selectedDifficulty === difficulty
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span>{difficulty}</span>
                      <span className="text-sm opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {sortedTopics.length > 0 ? (
            sortedTopics.map(([title, problems]) => (
              <ProblemAccordion 
                key={title} 
                title={title} 
                problems={problems}
              />
            ))
          ) : (
            <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
              <AlertCircle className="text-primary shrink-0" size={24} />
              <div>
                <h3 className="font-medium text-foreground">No problems found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your filters to see more problems.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SheetPage;