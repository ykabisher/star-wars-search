// text.test.tsx
import React from 'react';
import { highlightSearchTerm } from './text';
import { render } from '@testing-library/react';

describe('highlightSearchTerm', () => {
  test('should highlight the search term when it is present in the text', () => {
    const text = 'This is a sample text';
    const searchTerm = 'sample';
    const { container } = render(<div>{highlightSearchTerm(text, searchTerm)}</div>);

    // Check if the text "sample" is wrapped in a <strong> tag
    const strongElement = container.querySelector('strong');
    expect(strongElement).toBeInTheDocument();
    expect(strongElement?.textContent).toBe('sample');
  });

  test('should return the text without highlighting when the search term is not provided', () => {
    const text = 'This is a sample text';
    const searchTerm = ''; // No search term
    const { container } = render(<div>{highlightSearchTerm(text, searchTerm)}</div>);

    // Check if the entire text is returned without any <strong> tags
    const strongElement = container.querySelector('strong');
    expect(strongElement).not.toBeInTheDocument();
    expect(container.textContent).toBe(text);
  });
}); 