/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ]
},
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'desktop': '975px',
      'xl': '1200px',
    },
    extend: {
      aspectRatio: {
        '4_3': '4 / 3',
        '5_3': '5 / 3',
        '5_4': '5 / 4',
        '2_1': '2 / 1',
        '1_2': '1 / 2',
        '21_9': '21 / 9',
        '3_1': '3 / 1',
        '3_2': '3 / 2',
        '15_2': '15 / 2',
        '11_5': '11 / 5',
        '16_10': '16 / 10',
        '8_5': '8 / 5',
        'map': '5 / 4',
        'mobileMap': '10 / 9'
      },
      transitionProperty: {
        'basic': 'opacity, transform, text-shadow',
        'bg': 'opacity, transform, background',
        'w': 'opacity, width',
        'wh': 'opacity, width, height',
      },
      colors: {
        'nav-bg': 'rgba(38, 52, 88, 0.6)',
        'nav-bg-mobile': 'rgba(38, 52, 88, 0.7)',
        'nav-yellow': '#F2D487',
        'gold': '#D7AB6A',
        'light-gold': '#EDDCBD',
        'gold2': '#C79C5D',
        'gold3': '#A66401',
        'gold4': '#AE8534',
        'gold5': '#B8873F',
        'gold6': '#DAA767',
        'gold7': '#F3E9C1',
        'gold8': '#DCC69A',
        'gold9': '#F4DAB2',
        'gold10': '#FDEBBE',
        'black1' : '#1F1F1F',
        'black2' : '#1E022B',
        'gray2' : '#656565',
        "beige" : "#FFFDF0",
        "beige2" : "#FFF9E3",
        "beige3" : "#FFFCEE",
        "beige4" : "#fffcef"
      },
      zIndex: {
        'nav': '96',
        'desktopNav': '98',
        'navBtn': '99',
        'kvTitles': '94',
        'kvArrow': '98',
        'kvShadow' : '90',
        'kvTrShadow' : '90',
        'kvVideoPlayBtn': '98',
        'playBtn' : '90',
        'pin' : '89',
        'pinOutline' : '88',
        'navVideoBar' : '90',
        'modalContent' : '500',
        'modalCloser' : '600'
      },
      padding: {
        'desktopPageX':'2vw',
        'mobilePageX':'2vw',
        'desktopPageX2':'4vw',
        'mobilePageX2':'4vw',
        'desktopPageY':'2vh',
      },
      gap: {
        'vw': '1vw',
        'vh': '1vh',
        'vw2': '2vw',
        'vw3': '3vw',
        'vw10': '10vw',
        'vw12': '12vw',
        'vh2': '2vh',
        'px15': '15px',
        'px16': '16px',
        'px20': '20px',
        'px32': '32px',
        'px36': '36px',
        'zero': '0',
        'px10': '10px',
        'rem-075' : '0.75rem'
      }
    },
  },
  plugins: [],
}
