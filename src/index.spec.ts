import { Either } from ".";

describe('Either', () => {
  describe('constructor', () => {
    it('should create an Either instance with a Left value', () => {
      const either = Either.left<string, number>('Error message');
      expect(either).toBeDefined();
      expect(either).toBeInstanceOf(Either);
      expect(either.match).toBeDefined();
      expect(either.match).toBeInstanceOf(Function);
      expect(either.flatMap).toBeDefined();
      expect(either.flatMap).toBeInstanceOf(Function);
    });

    it('should create an Either instance with a Right value', () => {
      const either = Either.right<string, number>(42);
      expect(either).toBeDefined();
      expect(either).toBeInstanceOf(Either);
      expect(either.match).toBeDefined();
      expect(either.match).toBeInstanceOf(Function);
      expect(either.flatMap).toBeDefined();
      expect(either.flatMap).toBeInstanceOf(Function);
    });
  });

  describe('match', () => {
    it('should call the left function for a Left value', () => {
      const either = Either.left<string, number>('Error message');
      const leftMock = jest.fn();
      const rightMock = jest.fn();

      either.match({
        left: leftMock,
        right: rightMock,
      });

      expect(leftMock).toHaveBeenCalledWith('Error message');
      expect(rightMock).not.toHaveBeenCalled();
    });

    it('should call the right function for a Right value', () => {
      const either = Either.right<string, number>(42);
      const leftMock = jest.fn();
      const rightMock = jest.fn();

      either.match({
        left: leftMock,
        right: rightMock,
      });

      expect(leftMock).not.toHaveBeenCalled();
      expect(rightMock).toHaveBeenCalledWith(42);
    });
  });

  describe('flatMap', () => {
    it('should return a new Either with the transformed value for a Right value', () => {
      const either = Either.right<string, number>(42);
      const result = either.flatMap((value) => Either.right<string, string>(`Result: ${value}`));

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Either);
      expect(result.match).toBeDefined();
      expect(result.match).toBeInstanceOf(Function);
      expect(result.flatMap).toBeDefined();
      expect(result.flatMap).toBeInstanceOf(Function);

      result.match({
        left: (error) => fail(`Expected a Right value, but got Left: ${error}`),
        right: (value) => expect(value).toEqual('Result: 42'),
      });
    });

    it('should return the original Left value for a Left value', () => {
      const either = Either.left<string, number>('Error message');
      const result = either.flatMap((value) => Either.right<string, string>(`Result: ${value}`));

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Either);
      expect(result.match).toBeDefined();
      expect(result.match).toBeInstanceOf(Function);
      expect(result.flatMap).toBeDefined();
      expect(result.flatMap).toBeInstanceOf(Function);

      result.match({
        left: (error) => expect(error).toEqual('Error message'),
        right: (value) => fail(`Expected a Left value, but got Right: ${value}`),
      });
    });
  });
});
