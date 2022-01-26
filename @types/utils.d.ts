type Extends<T, R> = Omit<T, keyof R> & R;

type Maybe<T> = T | undefined;
