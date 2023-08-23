export const setRating = (rating: number) => {
  switch (true) {
    case rating === 0:
      return '0%';
    case rating === 1:
      return '20%';
    case rating === 2:
      return '40%';
    case rating === 3:
      return '60%';
    case rating === 4:
      return '80%';
    case rating === 5:
      return '100%';
    default:
      return '0%';
  }
};
