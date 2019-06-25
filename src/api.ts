export const fakeApi: (
  callback: (result: number) => void
) => void = callback => {
  setTimeout(() => {
    callback(Math.round(Math.random() * 10));
  }, 4);
};
