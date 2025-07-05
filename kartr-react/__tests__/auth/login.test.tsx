import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '@/app/auth/login/page';
import { useAppStore } from '@/store/app-store';

// Mock the stores and router
jest.mock('@/store/app-store');
jest.mock('next/navigation');

const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('LoginPage', () => {
  const mockSetUser = jest.fn();
  const mockAddNotification = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    mockUseAppStore.mockReturnValue({
      setUser: mockSetUser,
      addNotification: mockAddNotification,
      user: null,
      isLoading: false,
      sidebarOpen: false,
      setSidebarOpen: jest.fn(),
      notifications: [],
      removeNotification: jest.fn(),
      setLoading: jest.fn(),
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
      expect(mockAddNotification).toHaveBeenCalledWith({
        title: 'Welcome back!',
        message: 'You have successfully logged in.',
        type: 'success',
      });
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('toggles password visibility', () => {
    render(<LoginPage />);
    
    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: '' }); // Eye icon button

    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('renders Google login button', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();
  });

  it('renders sign up link', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});