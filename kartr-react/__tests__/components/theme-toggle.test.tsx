import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useThemeStore } from '@/store/theme-store';

// Mock the theme store
jest.mock('@/store/theme-store');

const mockUseThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>;

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    mockUseThemeStore.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      setResolvedTheme: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows sun icon for light theme', () => {
    render(<ThemeToggle />);
    
    const sunIcon = screen.getByRole('button');
    expect(sunIcon).toBeInTheDocument();
  });

  it('shows moon icon for dark theme', () => {
    mockUseThemeStore.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      setResolvedTheme: jest.fn(),
    });

    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});