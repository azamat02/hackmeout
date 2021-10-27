import './App.css';
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import {Route, BrowserRouter as Router, Switch, Redirect, useHistory} from "react-router-dom";
import {Button, Result} from "antd";

function App() {
  const history = useHistory()

  return (
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <Redirect to={'/login'}/>
        </Route>
        <Route exact path={'/login'} >
          <LoginPage/>
        </Route>
        <Route path={'/app'}>
          <MainPage/>
        </Route>
        <Route>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited doesn't exist."
            extra={<Button type="primary" onClick={()=>{history.push('/')}}>Back Home</Button>}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
