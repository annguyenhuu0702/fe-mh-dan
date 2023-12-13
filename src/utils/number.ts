const formatNumber = (number: number) => {
  try {
    return number
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    return 0;
  }
};

export { formatNumber };
