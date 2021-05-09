import { createMuiTheme } from '@material-ui/core/styles';
import { Colors } from './colors';

export const texelTheme = createMuiTheme({
   palette: {
      primary: {
         main: Colors.BLUE,
      },
      secondary: {
         main: Colors.PINK,
      },
   },
});

export const notificationsStyle = {
   NotificationItem: {
      // Override the notification item
      DefaultStyle: {
         // Applied to every notification, regardless of the notification level
         margin: '10px 5px 2px 1px',
         borderRadius: '5px',
         fontSize: '15px',
      },

      success: {
         borderTop: 'none',
         padding: '12px',
         backgroundColor: '#f0f5ea',
         color: '#4b583a',
         WebkitBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         MozBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
      },

      error: {
         borderTop: 'none',
         padding: '12px',
         backgroundColor: Colors.ERROR_RED,
         color: Colors.WHITE,
         WebkitBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         MozBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
      },

      warning: {
         borderTop: 'none',
         padding: '12px',
         backgroundColor: '#f9f6f0',
         color: '#5a5343',
         WebkitBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         MozBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
      },

      info: {
         borderTop: 'none',
         padding: '12px',
         backgroundColor: Colors.DARK_GREY,
         color: Colors.WHITE,
         WebkitBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         MozBoxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
         boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.32)',
      },
   },

   MessageWrapper: {
      DefaultStyle: {
         margin: 0,
         padding: 0,
      },
   },

   Dismiss: {
      DefaultStyle: {
         cursor: 'pointer',
         fontFamily: 'Arial',
         fontSize: '17px',
         position: 'absolute',
         top: '4px',
         right: '5px',
         lineHeight: '15px',
         backgroundColor: '#dededf',
         color: '#ffffff',
         borderRadius: '50%',
         width: '14px',
         height: '14px',
         fontWeight: 'bold',
         textAlign: 'center',
      },

      success: {
         color: '#f0f5ea',
         backgroundColor: '#b0ca92',
      },

      error: {
         color: '#f4e9e9',
         backgroundColor: '#e4bebe',
      },

      warning: {
         color: '#f9f6f0',
         backgroundColor: '#e1cfac',
      },

      info: {
         color: '#e8f0f4',
         backgroundColor: '#a4becb',
      },
   },

   Action: {
      DefaultStyle: {
         background: '#ffffff',
         borderRadius: '2px',
         padding: '6px 20px',
         fontWeight: 'bold',
         textTransform: 'uppercase',
         margin: '10px 0 0 0',
         border: 0,
      },

      success: {
         backgroundColor: 'none',
         background: 'none',
         color: '#ffffff',
      },

      error: {
         backgroundColor: 'none',
         background: 'none',
         color: '#ffffff',
      },

      warning: {
         backgroundColor: 'none',
         background: 'none',
         color: '#ffffff',
      },

      info: {
         backgroundColor: 'none',
         background: 'none',
         color: '#ffffff',
      },
   },

   ActionWrapper: {
      DefaultStyle: {
         margin: 0,
         padding: 0,
         position: 'absolute',

         right: '0px',
         top: '-3px',
         width: '90px',
      },
   },
};
