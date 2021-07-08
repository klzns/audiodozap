import { styled } from '../../stitches.config'

export const Title = styled('h2', {
  position: 'relative',
  textShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
  fontSize: '1.4em',
  marginBottom: '0.75em',
  marginTop: '0.5em',

  variants: {
    color: {
      0: {
        color: '#91ab01', // Lemon green
        '& a': {
          color: '#91ab01', // Lemon green
        }
      },
      1: {
        color: '#e542a3', // Pink
        '& a': {
          color: '#e542a3', // Pink
        }
      },
      2: {
        color: '#6bcbef', // Light blue
        '& a': {
          color: '#6bcbef', // Light blue
        }
      },
      3: {
        color: '#35cd96', // Neon green
        '& a': {
          color: '#35cd96', // Neon green
        }
      },
      4: {
        color: '#1f7aec', // Blue
        '& a': {
          color: '#1f7aec', // Blue
        }
      },
      5: {
        color: '#ffa97a', // Orange
        '& a': {
          color: '#ffa97a', // Orange
        }
      },
      6: {
        color: '#dfb610', // Yellow
        '& a': {
          color: '#dfb610', // Yellow
        }
      },
      7: {
        color: '#00bfa5', // Teal
        '& a': {
          color: '#00bfa5', // Teal
        }
      },
    }
  },
  '& a': {
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
