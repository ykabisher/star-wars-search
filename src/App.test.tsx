import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders the first page - star wars search engine', () => {
  render(<App />);
   // Check if the heading with the text "Star Wars Search Engine" is in the document
   const linkElement = screen.getByText(/Star Wars Search Engine/i);
   expect(linkElement).toBeInTheDocument();
   
   // Check if there's an input field with the placeholder "Search for Star Wars data..."
   const inputElement = screen.getByPlaceholderText(/Search for Star Wars data.../i);
   expect(inputElement).toBeInTheDocument();
});
