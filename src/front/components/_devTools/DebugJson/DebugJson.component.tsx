export function DebugJson(object: any) {
  return (
    <pre>
      <code>{JSON.stringify(object, null, 2)}</code>
    </pre>
  );
}
