type Extends<T, R> = Omit<T, keyof R> & R;

type Maybe<T> = T | undefined;
type MaybeNull<T> = T | null;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
