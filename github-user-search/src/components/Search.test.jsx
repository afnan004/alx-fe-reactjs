import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Search from './Search';

jest.mock('axios');

describe('Search Component', () => {
  it('displays error message when user not found', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });
    
    render(<Search />);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'nonexistentuser' }
    });
    fireEvent.click(screen.getByTestId('search-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        "Looks like we can't find the user"
      );
    });
  });

  it('calls correct GitHub API endpoint', async () => {
    const mockUser = {
      login: 'testuser',
      avatar_url: 'https://test.com/avatar',
      html_url: 'https://github.com/testuser',
      followers: 10,
      following: 5,
      public_repos: 20
    };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    render(<Search />);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'testuser' }
    });
    fireEvent.click(screen.getByTestId('search-button'));
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/testuser'
      );
      expect(screen.getByTestId('user-name')).toHaveTextContent('testuser');
    });
  });
});