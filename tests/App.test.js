import { screen, render } from '@testing-library/react'
import App from '../App'

test('should first', () => { 
    render(<App />)
    const linkElement = screen.getByText(/d/i)
    expect(linkElement).toBeIntheDocument();
});