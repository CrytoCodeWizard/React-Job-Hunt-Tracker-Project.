export const transformErrorMessage = (message: string) => {
  return message
    .match(/[a-z 0-9]+!/gi)
    ?.map((item) => item.trim())
    .join(" ");
};
