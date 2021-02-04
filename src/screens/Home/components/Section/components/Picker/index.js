import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Picker as RNPicker } from '@react-native-community/picker';
import styles from './styles';

class Picker extends PureComponent {
  /*
   *  Aqui é passado o nome do Picker, nesse projeto os valores possíveis são
   *  'primary' e 'secondary', e o seu novo valor para a função recebida via props;
   */
  onValueChange = (value) => {
    const { name, onValueChange } = this.props;

    onValueChange(name, value);
  }

  render() {
    const { selectedValue } = this.props;

    return (
      <RNPicker
        selectedValue={selectedValue}
        style={styles.picker}
        mode="dropdown"
        onValueChange={this.onValueChange}
      >
        <RNPicker.Item
          label="Selecione aqui"
          value=""
        />
        <RNPicker.Item
          label="Metros"
          value={1}
        />
        <RNPicker.Item
          label="Centímetros"
          value={-1}
        />
        <RNPicker.Item
          label="Milímetros"
          value={-2}
        />
      </RNPicker>
    );
  }
}

Picker.propTypes = {
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
};

export default Picker;
