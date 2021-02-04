import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import Picker from './components/Picker';
import styles from './styles';

class Section extends PureComponent {
 validateInput = (newText) => {
   const { handleValueChange } = this.props;

   /*
    *  Verificamos se o valor digitado não é numéricamente negativo, ou seja,
    *  se o texto inclui "-". A prop handleValueChange é executada com parâmetro
    *  '' em caso positivo, e em caso negativo, é executada com parâmetro newText.
    */
   if (Number.isNaN(newText)) return handleValueChange('');
   return handleValueChange(newText);
 }

 //  Renderização condicional
 render() {
   const {
     title, type, value, handlePickerChange,
     text, result,
   } = this.props;

   return (
     <>
       <Text style={styles.title}>
         {title}
       </Text>
       <View style={styles.pickerContainer}>
         <Picker
           name={type === 'input' ? 'primary' : 'secondary'}
           selectedValue={value}
           onValueChange={handlePickerChange}
         />
         {
           // Dependendo do valor da prop "type, temos um TextInput ou um Text.
             type === 'input' ? (
               <TextInput
                 style={styles.measure}
                 dense
                 mode="flat"
                 keyboardType="numeric"
                 value={text}
                 onChangeText={this.validateInput}
               />
             ) : (<Text style={styles.measure}>{result}</Text>)
             }
       </View>
     </>
   );
 }
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handlePickerChange: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func,
  text: PropTypes.string,
  result: PropTypes.string,
};

export default Section;
