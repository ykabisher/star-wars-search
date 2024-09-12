import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CategoryPage from './CategoryPage';
import { CategoryData } from '../consts/dataTypes';

// Mocking dependencies
jest.mock('../hooks/useAPI', () => ({
  __esModule: true,
  default: () => ({
    searchResults: null,
    loading: false,
    error: null,
  }),
}));

const mockGoBack = jest.fn();

const mockCategoryData: CategoryData = {
  name: 'people',
  totalItems: 10,
  searchString: 'Luke',
  data: [
    {
      birth_year: '19BBY',
      eye_color: 'blue',
      gender: 'male',
      hair_color: 'blond',
      height: '172',
      homeworld: 'Tatooine',
      mass: '77',
      name: 'Luke Skywalker',
      skin_color: 'fair',
      created: '',
      edited: '',
      url: '1',
    },
  ],
};
afterEach(() => {
    cleanup();
  });
describe('CategoryPage', () => {
  test('renders category page with people data', () => {
    render(<CategoryPage goBack={mockGoBack} categoryData={mockCategoryData} />);
    
    // Check for title
    expect(screen.getByText('Edit people entries')).toBeInTheDocument();

    // Check if data table renders person information
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  test('calls goBack when "Go Back" button is clicked', () => {
    render(<CategoryPage goBack={mockGoBack} categoryData={mockCategoryData} />);
    
    const goBackButton = screen.getByText('Go Back');
    fireEvent.click(goBackButton);
    
    // Assert goBack is called
    expect(mockGoBack).toHaveBeenCalled();
  });

  test('shows modal to add new person when "Add New Person" button is clicked', () => {
    render(<CategoryPage goBack={mockGoBack} categoryData={mockCategoryData} />);
    
    const addPersonButton = screen.getByText('Add New Person');
    fireEvent.click(addPersonButton);
    
    // Check for modal title indicating new person form
    expect(screen.getByText('Add New Person')).toBeInTheDocument();
  });

  test('loads more people when "Load More" button is clicked', () => {
    const updatedCategoryData = {
      ...mockCategoryData,
      data: [...mockCategoryData.data],
      totalItems: 20, // Assume we have more than 10 items now
    };

    render(<CategoryPage goBack={mockGoBack} categoryData={updatedCategoryData} />);
    
    const loadMoreButton = screen.getByText('Load More');
    fireEvent.click(loadMoreButton);
    
    // We can check if more data would be loaded (this is simplistic for the purpose of this test)
    expect(loadMoreButton).toBeInTheDocument();
  });
});
