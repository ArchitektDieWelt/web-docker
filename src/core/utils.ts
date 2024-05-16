export const forEachSeries = async <T>(
  iterable: T[],
  action: (item: T) => Promise<void>
) => {
  for (const x of iterable) {
    await action(x);
  }
};
