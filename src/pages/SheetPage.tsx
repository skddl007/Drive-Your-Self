import { AlertCircle, Building2, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardStats from '../components/dashboard/DashboardStats';
import { ProblemAccordion } from '../components/ProblemAccordion';
import { useProblems } from '../contexts/ProblemContext';
import { Difficulty, Problem } from '../types/problem';

// Interface for the raw JSON data
interface RawProblemData {
  Title: string;
  Problem: string;
  'Practice Link': string;
  Difficulty: string;
  'Company Name': string;
}

const SheetPage: React.FC = () => {
  const { sheetId } = useParams<{ sheetId: string }>();
  const { completedProblems } = useProblems();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<string[]>([]);

  // Calculate problem statistics
  const completedCount = problems.filter(p => completedProblems.includes(p.Problem)).length;

  // Calculate difficulty statistics
  const easyProblems = problems.filter(p => p.Difficulty?.toLowerCase() === 'easy');
  const mediumProblems = problems.filter(p => p.Difficulty?.toLowerCase() === 'medium');
  const hardProblems = problems.filter(p => p.Difficulty?.toLowerCase() === 'hard');

  const easyTotal = easyProblems.length;
  const mediumTotal = mediumProblems.length;
  const hardTotal = hardProblems.length;

  const easyCompleted = easyProblems.filter(p => completedProblems.includes(p.Problem)).length;
  const mediumCompleted = mediumProblems.filter(p => completedProblems.includes(p.Problem)).length;
  const hardCompleted = hardProblems.filter(p => completedProblems.includes(p.Problem)).length;

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
        // Import the JSON data directly instead of fetching it
        let data = [];
        try {
          if (sheetId === 'sde') {
            // Import the SDE sheet data
            const sdeSheetData = await import('../data/sdeSheet.json');
            data = sdeSheetData.default;
          } else if (sheetId === 'advanced') {
            // Import the Advanced sheet data
            const advancedSheetData = await import('../data/basicToAdvanced.json');
            data = advancedSheetData.default;
          } else {
            throw new Error('Invalid sheet type');
          }
        } catch (importError) {
          console.error('Error importing JSON data:', importError);
          throw new Error(`Failed to load ${sheetId} sheet data`);
        }

        // Extract all unique companies
        const allCompanies = new Set<string>();

        // Clean and normalize the data
        const cleanedData = data.map((problem: RawProblemData, index: number) => {
          // Clean up and validate difficulty
          const rawDifficulty = (problem.Difficulty || '').toString().replace(/[",']/g, '').trim();
          const difficulty: Difficulty = ['Easy', 'Medium', 'Hard'].includes(rawDifficulty as Difficulty)
            ? rawDifficulty as Difficulty
            : 'Medium';

          // Process company names - split by comma and trim
          const companyNames = problem['Company Name']
            ? problem['Company Name'].split(',').map((c: string) => c.trim()).filter((c: string) => c)
            : [];

          // Add companies to the set of all companies
          companyNames.forEach((company: string) => {
            if (company && company !== 'Not specified' && company !== '') {
              allCompanies.add(company);
            }
          });

          return {
            ...problem,
            id: `${sheetId}-${index + 1}`,
            Difficulty: difficulty,
            Title: problem.Title?.trim() || 'Uncategorized',
            Problem: problem.Problem?.trim() || 'Untitled Problem',
            'Practice Link': problem['Practice Link']?.split(',')[0]?.trim() || '#',
            'Company Name': problem['Company Name']?.trim() || 'Not specified',
            CompanyNames: companyNames
          };
        });

        setProblems(cleanedData);
        setFilteredProblems(cleanedData);

        // Sort companies by problem count (descending)
        const companiesWithCounts = Array.from(allCompanies).map(company => {
          const count = cleanedData.filter(p =>
            p.CompanyNames && p.CompanyNames.includes(company)
          ).length;
          return { name: company, count };
        });

        // Sort by count (descending)
        companiesWithCounts.sort((a, b) => b.count - a.count);

        // Extract just the company names in the sorted order
        setCompanies(companiesWithCounts.map(c => c.name));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problems');
        console.error('Error loading problems:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [sheetId]);

  // Apply filters when changed
  useEffect(() => {
    let result = [...problems];

    // Apply difficulty filter
    if (selectedDifficulty) {
      result = result.filter(problem => {
        const problemDifficulty = problem.Difficulty?.trim();
        return problemDifficulty && problemDifficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      });
    }

    // Apply company filter
    if (selectedCompany) {
      result = result.filter(problem => {
        // Check if the problem has the selected company
        return problem.CompanyNames &&
               problem.CompanyNames.some(company =>
                 company.toLowerCase() === selectedCompany.toLowerCase()
               );
      });
    }

    setFilteredProblems(result);
  }, [selectedDifficulty, selectedCompany, problems]);

  // Group filtered problems by Title (topic) while preserving order
  const topicOrder: string[] = [];
  const problemsByTopic = filteredProblems.reduce((acc, problem) => {
    // Skip empty topics
    if (!problem.Title.trim()) return acc;

    if (!acc[problem.Title]) {
      acc[problem.Title] = [];
      // Track the order of topics as they appear in the JSON
      if (!topicOrder.includes(problem.Title)) {
        topicOrder.push(problem.Title);
      }
    }
    acc[problem.Title].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);

  // Use the original order from the JSON file
  const sortedTopics = topicOrder.map(topic => [topic, problemsByTopic[topic]] as [string, Problem[]]);

  const handleDifficultyFilter = (difficulty: Difficulty | null) => {
    // If clicking the already selected difficulty, clear the filter
    if (difficulty === selectedDifficulty) {
      setSelectedDifficulty(null);
    } else {
      // Otherwise, set the new difficulty filter
      setSelectedDifficulty(difficulty);
    }
  };

  const handleCompanyFilter = (company: string | null) => {
    // If clicking the already selected company, clear the filter
    if (company === selectedCompany) {
      setSelectedCompany(null);
    } else {
      // Otherwise, set the new company filter
      setSelectedCompany(company);
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
              {selectedCompany && ` • ${selectedCompany} company`}
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
            {/* Company Filter */}
            {companies.length > 0 && (
              <div className="bg-card rounded-lg p-4">
                <h2 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Building2 size={16} />
                  <span>Company</span>
                </h2>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {companies.map((company) => {
                    const count = problems.filter(p =>
                      p.CompanyNames && p.CompanyNames.includes(company)
                    ).length;

                    return (
                      <button
                        key={company}
                        onClick={() => handleCompanyFilter(company)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                          selectedCompany === company
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        <span className="truncate">{company}</span>
                        <span className="text-sm opacity-60 ml-2">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Difficulty Filter */}
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
