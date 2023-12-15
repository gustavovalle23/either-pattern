type Left<T> = {
  tag: 'left';
  value: T;
};

type Right<T> = {
  tag: 'right';
  value: T;
};

type Either<L, R> = Left<L> | Right<R>;

class EitherClass<L, R> {
  private constructor(private value: Either<L, R>) { }

  static left<L, R>(value: L): EitherClass<L, R> {
    return new EitherClass<L, R>({ tag: 'left', value });
  }

  static right<L, R>(value: R): EitherClass<L, R> {
    return new EitherClass<L, R>({ tag: 'right', value });
  }

  match(pattern: { left: (value: L) => void; right: (value: R) => void }): void {
    if (this.value.tag === 'left') {
      pattern.left(this.value.value);
    } else {
      pattern.right(this.value.value);
    }
  }

  flatMap<U>(fn: (value: R) => EitherClass<L, U>): EitherClass<L, U> {
    if (this.value.tag === 'left') {
      return EitherClass.left<L, U>(this.value.value);
    } else {
      return fn(this.value.value);
    }
  }
}

export { EitherClass as Either };
