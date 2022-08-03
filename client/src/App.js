import './App.css';
import { Header } from './components/header';
import { Home} from './pages/Home';
import { NotFound } from './pages/NotFound';
import { SingleProject } from './pages/SingleProject';
import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddClient } from './pages/AddClient';
import { AddProject } from './pages/AddProject';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/project/:id' element={<SingleProject/>} />
              <Route path='/addclient' element={<AddClient/>}/>
              <Route path='/addproject' element={<AddProject/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
