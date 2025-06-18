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
    ...prefix,
    header: {
      background: "#FFFFFF",
      box_shadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      link: '#606060',
    },
    colors: {
      primary: '#6A42C2',

      background: "#EBEEF7",
      background_modal: '#FFF',
      background_button: '#FFF',

      white: '#FFF',

      text: '#707070',
      text_title: '#303030',

      success: '#41B06E',
      error: '#F93176',

      dark_charcoal: '#303030',
      granite_gray: '#606060',
      philippine_gray: '#909090',
    },
    box: {
      shadow: {
        default: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        banner: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        input: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        select: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        modal: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }
    }
  },

  dark: {
    ...prefix,
    header: {
      background: "#2A3335",
      box_shadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      link: '#FFFFFF'
    },
    colors: {
      primary: '#6A42C2', 

      background: '#121212',
      background_modal: '#1E1E1E',
      background_button: '#2A2A2A', 

      white: '#E0E0E0', 

      text: '#B0B0B0',
      text_title: '#FFFFFF', 

      success: '#41B06E',
      error: '#F93176', 

      dark_charcoal: '#E0E0E0',
      granite_gray: '#A0A0A0',
      philippine_gray: '#707070', 
    },
    box: {
      shadow: {
        default: 'rgba(255, 255, 255, 0.02) 0px 1px 3px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px',
        banner: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        input: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        select: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        modal: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }
    }
  }
};