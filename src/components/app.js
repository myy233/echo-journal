import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './home';
import ViewEntry from './view_entry';
import NewEntry from './new_entry';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries: [
        {
          title: 'First Entry',
          date: '2018-01-02',
          phrase: 'lorem',
          log: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente maxime nobis totam a in laudantium tenetur deserunt inventore sit molestiae officia doloremque accusantium, voluptate praesentium placeat quo rerum ab dolore`,
          emotion: {
            Neutral: 0.760,
            Happy: 0.000,
            Sad: 0.238,
            Angry: 0.001,
            Fear: 0.000
          },
        }
      ]
    }
  }

  createEntry = (entry) => {
    const Neutral = parseFloat((1 * Math.random()).toFixed(3));
    const Happy = parseFloat(((1 - Neutral) * Math.random()).toFixed(3));
    const Sad = parseFloat(((1 - Happy - Neutral) *  Math.random()).toFixed(3));
    const Angry = parseFloat(((1 - Sad - Happy - Neutral) *  Math.random()).toFixed(3));
    const Fear = parseFloat((1 - Angry - Sad - Happy - Neutral).toFixed(3));
    
    entry.emotion = { Neutral, Happy, Sad, Angry, Fear}
    this.setState((prevState) => ({
      entries: [...prevState.entries, entry ]
    }));


  }

  render() {
    return (
      <BrowserRouter> 
        <div className="App">
          <Switch>
            <Route path="/new" render={() =>(
              <NewEntry createEntry={this.createEntry} />  
            )} />
            <Route path="/entry/:id" render={(props) => (
              <ViewEntry {...props} entries={this.state.entries} />
            )}/>
            <Route path="/" render={()=> (
              <Home entries={this.state.entries} />
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
