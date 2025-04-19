export const ellipsifyMiddle = (str: string, front = 7, back = 5) => {
  if (str.length <= front + back) {
    return str;
  }

  return `${str.slice(0, front)}...${str.slice(-back)}`;
};
