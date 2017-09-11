import React  from 'react';
import {AppRegistry} from 'react-native';
import {MobileQuantumContext} from './styles/MobileQuantumContext';
import {Div} from './quantum/native/Div';
import classNames from 'classnames';

let updateTimes = [];

export default class App extends React.Component {

  state = {
    fontSizeClassName: 'fz-m'
  };

  componentDidMount() {
    setInterval(() => {
      const time = Date.now();
      this.setState({
        fontSizeClassName: Math.random() > 0.5 ? 'fz-m' : 'fz-xl'
      }, () => {
        const newTime = Date.now() - time;
        updateTimes.push(newTime);
        if (updateTimes.length >= 20) {
          console.info('20 updates: ', updateTimes.reduce((acc, next) => (acc += next, acc), 0) / 20);
          updateTimes = [];
        }
      });
    }, 50);
  }

  render() {
    return (
      <MobileQuantumContext>
        <Div className={classNames('fx1 c-w lh-t bgc-r', this.state.fontSizeClassName)}>
          hey there
          <Div className="btn btn--fb" onPress={() => console.info('connecting to facebook')}>Connect Facebook</Div>

          qux
          <Div className={classNames('w50p c-w bgc-b')}>
            foo
            <Div className="w100 h50 c-bb bgc-g7">
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
              <Div className="c-r">123123123</Div>
            </Div>

            <Div className="w100 h100 bgc-g3 c-b"
                 onPress={() => console.info('baz')}>baz</Div>

          </Div>

          <Div className="w100p bgc-g7" style={{height: 400}} onPress={() => console.info(400)}>
            <Div className="w100p bgc-g3" style={{height: 200}} onPress={() => console.info(200)}>
              hey there
            </Div>
          </Div>
        </Div>
      </MobileQuantumContext>
    );
  }
}

AppRegistry.registerComponent('HeritableStyles', () => App);
