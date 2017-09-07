import React  from 'react';
import {AppRegistry} from 'react-native';
import {Div} from './src/components/div/Div';
import {MobileQuantumContext} from './src/MobileQuantumContext';

export default class HeritableStyles extends React.Component {
  render() {
    return (
      <MobileQuantumContext>
        <Div className={['fx1 fz-m c-r', Math.random() > 0.5 && 'bgc-r']}
             onPress={() => console.info('qux')}>
          qux
          <Div className="w50p fz-m c-w bgc-b"
               onPress={() => console.log('foo')}>
            foo
            <Div className="w100 h50 c-bb bgc-g7">yo</Div>

            <Div className={['w100 h100 bgc-g3 c-b']}
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

AppRegistry.registerComponent('HeritableStyles', () => HeritableStyles);
