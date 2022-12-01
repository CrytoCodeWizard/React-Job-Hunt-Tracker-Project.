export const transformErrorMessage = (message: string) => {
  return message
    .match(/[a-z 0-9]+!/gi)
    ?.map((item) => item.trim())
    .join(" ");
};

export const toTitle = (message: string) => {
  return message
    .trim()
    .split(" ")
    .map((item) => item[0]?.toUpperCase() + item?.slice(1))
    .join(" ");
};
