export const color = {
    primary: '#49c5b6',
    red: '#ff1744',
    grey: {
        grey0: '#fafafa',
        grey1: '#eceff1',
        grey2: '#cfd8dc',
        grey3: '#b0bec5',
        grey4: '#90a4ae',
        grey5: '#78909c',
        grey6: '#607d8b',
        grey7: '#546e7a',
        grey8: '#455a64',
        grey9: '#37474f',
        grey10: '#263238',
    },
    white: '#ffffff'
}

export const lightTheme = {
    body: color.white,
    border: color.grey.grey1,
    content: color.grey.grey0,
    disabled: color.grey.grey3,
    inverse: color.grey.grey10,
    text: color.grey.grey10,
    placeholder: color.grey.grey5,
    title: color.grey.grey10,
    overlay: 'rgba(38,50,56,0.7)',
    separator: color.grey.grey2,
    primary: color.primary,
    red: color.red,
    transition: 'all 300ms cubic-bezier(0.465, 0.183, 0.153, 0.946)'
}

export const darkTheme = {
    body: color.grey.grey9,
    border: color.grey.grey8,
    content: color.grey.grey10,
    disabled: color.grey.grey3,
    inverse: color.grey.grey0,
    text: color.white,
    title: color.white,
    overlay: 'rgba(255,255,255,0.2)',
    separator: color.grey.grey7,
    placeholder: color.grey.grey5,
    primary: color.primary,
    red: color.red,
    transition: 'all 300ms cubic-bezier(0.465, 0.183, 0.153, 0.946)'
}
