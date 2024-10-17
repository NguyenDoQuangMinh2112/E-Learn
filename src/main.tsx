import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from '~/components/GlobalStyles'

import { Provider } from 'react-redux'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import 'tippy.js/dist/tippy.css'

import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
