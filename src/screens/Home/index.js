import React, { PureComponent } from 'react';
import { Pressable, Keyboard } from 'react-native';
import Section from './components/Section';
import styles from './styles';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      primaryValue: '',
      secondaryValue: '',
      input: '',
      result: '',
    };
  }

  /*
   *    Não é necessário fazer o bind do this ao utilizar métodos como arrow
   *  functions, pois as mesmas recebem o this referente à classe;
   *    O módulo ESlint para de funcionar caso utilize esse estilo sem o parser
   *  @babel/eslint-parser;
   */
 handlePickerChange = (picker, itemValue) => {
   const { input } = this.state;
   const { primaryValue, secondaryValue } = this.state;

   if (input && (primaryValue !== null || secondaryValue !== null)) {
     if (itemValue !== null) {
       this.setState({
         [`${picker}Value`]: itemValue,
       }, this.calculate);
     } else {
       this.setState({
         [`${picker}Value`]: itemValue,
         result: '',
       });
     }
   } else {
     this.setState({
       [`${picker}Value`]: itemValue,
     });
   }
 }

  handleValueChange = (value) => {
    if (value) {
      const { primaryValue, secondaryValue } = this.state;
      if (primaryValue !== null && secondaryValue !== null) {
        this.setState({
          input: value,
        }, this.calculate);
      } else {
        this.setState({
          input: value,
        });
      }
    } else {
      this.setState({
        input: value,
        result: '',
      });
    }
  }

  calculate() {
    const { input, primaryValue, secondaryValue } = this.state;
    if (primaryValue && secondaryValue) {
      /*
       *  Todos os valores dos items do picker são proporcionais ao metro.
       *   Ex:
       *  Input = 2;
       *  Picker primário = 1 (metro);
       *  Picker secundário = -1 (centímetro);
       *
       *  Diferença = 1 - (-1) = 2;
       *  Resultado = 2 * 10² = 2000
       */

      /*
       *    Nota
       *    10 ** (primaryValue - secondaryValue) é equivalente a
       *    Math.pow(10, (primaryValue - secondaryValue))
       */

      this.setState({
        result: `${Number(input) * 10 ** (Number(primaryValue) - Number(secondaryValue))}`,
      });
    }
  }

  render() {
    const {
      primaryValue, secondaryValue, input, result,
    } = this.state;

    return (
      <Pressable
        style={styles.container}
        onPress={Keyboard.dismiss}
        android_disableSound
      >
        <Section
          title="Unidade de medida a ser convertida:"
          value={primaryValue}
          handlePickerChange={this.handlePickerChange}
          text={input}
          handleValueChange={this.handleValueChange}
          type="input"
        />

        <Section
          title="Unidade de medida para qual o valor será convertido:"
          value={secondaryValue}
          handlePickerChange={this.handlePickerChange}
          result={result}
          type="output"
        />

      </Pressable>
    );
  }
}
