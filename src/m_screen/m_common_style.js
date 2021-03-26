const customStyles = {
  container: (base) => ({
    ...base,

    border: '0',
    borderBottom: '#c0c0c0 solid 1px',
    width: 'calc(100% - 155px)',
  }),

  control: (base) => ({
    ...base,

    border: 'none',
    minHeight: '10px',
    boxShadow: 'none',
    '&:hover': {
      border: 'none'
    }
  }),

  valueContainer: (base) => ({
    ...base,
    padding: '0'
  }),

  indicatorsContainer: (base) => ({
    ...base,
    display: 'none',
  }),

  singleValue: (base) => ({
    ...base,
    marginLeft: '0px',
    color: 'black'
  }),

}

export { customStyles }
