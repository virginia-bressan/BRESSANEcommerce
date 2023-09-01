import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import Navigator from './src/Navigation/Navigator';
import { init } from './src/SQLite';
import store from './src/Store/store';

export default function App() {
  useEffect(()=> {
    init()
      .then((result)=> {
        
      })
      .catch(err => {
    })
  }, [])
  

  const [fontsLoaded] = useFonts({
    'Josefin': require('./src/Assets/Fonts/Josefin_Sans/JosefinSans-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}
