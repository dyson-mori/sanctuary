const prefix = {
  font: {
    size: {
      medium: '13px',
      large: '14px'
    },
    weight: {
      regular: 400,
      medium: 500,
      semi_bold: 600
    }
  },
  border: {
    small: '3px',
    middle: '6px',
    large: '9px'
  }
};

export default {
  light: {
    header: {
      background: "#FFFFFF",
      box_shadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      link: '#606060',
    },
    ...prefix,
    colors: {
      primary: '#6A42C2',

      background: "#EBEEF7",

      white: '#FFF',

      text: '#707070',

      success: '#41B06E',
      error: '#F93176',

      dark_charcoal: '#303030',
      granite_gray: '#606060',
      philippine_gray: '#909090',
    },

    notification: {
      background: '#FFFFFF'
    },

    box: {
      shadow: {
        default: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        header: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        banner: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        input: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      }
    }
  },

  ...prefix,

  dark: {
    header: {
      background: "#2A3335",
      box_shadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      link: '#FFFFFF'
    },
    ...prefix,
    colors: {
      primary: '#6A42C2',

      background: "#EBEEF7",
      // background: "#2A3335",

      white: '#FFF',

      text: '#707070',

      success: '#41B06E',
      error: '#F93176',

      dark_charcoal: '#303030',
      granite_gray: '#606060',
      philippine_gray: '#909090',
    },

    box: {
      shadow: {
        default: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        header: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        banner: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        input: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      }
    },

    notification: {
      background: '#303030'
    },
  }
};