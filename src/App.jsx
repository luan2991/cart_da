import './App.scss';
import Header from './components/header';
import ProductListPage from './features/ProductFeature/pages/List';
import CartFeature from './features/CartFeature';
import { Route, Switch } from 'react-router-dom';
import ProductDetailPage from './features/ProductFeature/pages/Detail';
import NotFoundFeature from './features/NotFoundFeature';
import AddPage from './features/ProductFeature/pages/Add';
import EditPage from './features/ProductFeature/pages/Edit';
function App() {
  // const [currentTheme, setCurrentTheme] = useState(themes.light)
  // const value ={currentTheme,setCurrentTheme};
  return (
    <div>
      <Header />

      {/*  ROUTING CONTENT */}
      <Switch>
        <Route path="/" exact component={ProductListPage} />
        <Route path="/cart" component={CartFeature} />
        <Route path="/:id/detail" component={ProductDetailPage}  />
        <Route path="/add" component={AddPage}  />
        <Route path="/:id/edit" component={EditPage}  />
        <Route component={NotFoundFeature}/>
      </Switch>
    </div>
  );
}

export default App;
