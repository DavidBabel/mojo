// https://github.com/vercel/next.js/issues/15913#issuecomment-911684434

type GetSSRResult<TProps> =
  | { props: TProps }
  | { redirect: any }
  | { notFound: true };

type GetSSRFn<TProps extends any> = (
  args: any,
) => Promise<GetSSRResult<TProps>>;

type InferSSRProps<TFn extends GetSSRFn<any>> = TFn extends GetSSRFn<
  infer TProps
>
  ? NonNullable<TProps>
  : never;
