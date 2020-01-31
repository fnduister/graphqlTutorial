exports.dateToString = (date) => {
  console.log(
    'TCL: exports.dateToString -> new Date(date).toISOString()',
    new Date(date).toISOString(),
  );
  return new Date(date).toISOString();
};
