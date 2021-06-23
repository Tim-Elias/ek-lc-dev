const calcPriceStyle = {
    control: (base) => ({
        ...base,

        width: '340px',
        height: '40px',
        padding: '0 5px',
        border: '2px solid #727272',
        borderRadius: '0',
        boxShadow: 'none',
        '&:hover': {
            border: '2px solid #727272',
            cursor: "text",
        }
    }),
    valueContainer: (base) => ({
        ...base,
        padding: 'none'
    }),

    indicatorsContainer: (base) => ({
        ...base,
        display: 'none',
    }),

    singleValue: (base) => ({
        ...base,
        marginLeft: '0px',
        color: 'black',
        fontSize: '16px',
    }),

    input: (base) => ({
        ...base,
        fontSize: '16px',
    }),

}

export { calcPriceStyle }
