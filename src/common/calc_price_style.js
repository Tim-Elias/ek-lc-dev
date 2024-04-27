const calcPriceStyle = {
  control: (base) => ({
    ...base,

    width: "340px",
    height: "28px",
    minHeight: "28px",
    padding: "0 5px",
    border: "0",
    borderBottom: "#c0c0c0 solid 1px",
    borderRadius: "0",
    boxShadow: "none",
    "&:hover": {
      border: "0",
      borderBottom: "#c0c0c0 solid 1px",
      cursor: "text",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "none",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    display: "none",
  }),

  singleValue: (base) => ({
    ...base,
    marginLeft: "0px",
    color: "black",
    fontSize: "13px",
  }),

  input: (base) => ({
    ...base,
    fontSize: "13px",
  }),
};

export { calcPriceStyle };
