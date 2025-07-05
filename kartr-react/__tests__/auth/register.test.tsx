import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import RegisterPage from '@/app/auth/register/page';
import { useAppStore } from '@/store/app-store';

// Mock the stores and router
jest.mock('@/store/app-store');
jest.mock('next/navigation');

const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('RegisterPage', () => {
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

  it('renders register form', () => {
    render(<RegisterPage />);
    
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<RegisterPage />);
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Last name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('validates password requirements', async () => {
    render(<RegisterPage />);
    
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Password must contain at least one uppercase letter/)).toBeInTheDocument();
    });
  });

  it('validates password confirmation', async () => {
    render(<RegisterPage />);
    
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Different123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });
  });

  it('requires terms acceptance', async () => {
    render(<RegisterPage />);
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument();
    });
  });

  it('renders Google signup button', () => {
    render(<RegisterPage />);
    
    expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();
  });

  it('renders sign in link', () => {
    render(<RegisterPage />);
    
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});