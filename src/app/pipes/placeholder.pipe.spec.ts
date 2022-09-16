import { PlaceholderPipe } from './placeholder.pipe';

describe('PlaceholderPipe', () => {
  const pipe = new PlaceholderPipe();

  it('transforms "word" to "Word"', () => {
    expect(pipe.transform('word')).toBe('Word');
  });

  it('transforms "twoWord" to "Two word"', () => {
    expect(pipe.transform('twoWord')).toBe('Two word');
  });

  it('transforms "MADNESS" to "Madness"', () => {
    expect(pipe.transform('MADNESS')).toBe('Madness');
  });

});
