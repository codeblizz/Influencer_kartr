import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock the app store
jest.mock('@/store/app-store', () => ({
  useAppStore: () => ({
    addNotification: jest.fn(),
    setSidebarOpen: jest.fn(),
  }),
}));

describe('HomePage', () => {
  it('renders main heading', () => {
    render(<HomePage />);
    
    const heading = screen.getByText('Modern Web Development');
    expect(heading).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
    expect(screen.getByText('Type Safe')).toBeInTheDocument();
    expect(screen.getByText('Production Ready')).toBeInTheDocument();
    expect(screen.getByText('Modern Architecture')).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<HomePage />);
    
    const getStartedButton = screen.getByRole('link', { name: /get started/i });
    const exploreFeaturesButton = screen.getByRole('link', { name: /explore features/i });
    
    expect(getStartedButton).toBeInTheDocument();
    expect(exploreFeaturesButton).toBeInTheDocument();
  });
});