import React from 'react';
import {
  View,
} from 'react-native';

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SelectWidget',
      multiple: false,
      onSelect: () => {},
      onClose: () => {},
    };
  },

  unSelectAll() {
    React.Children.forEach(this._childrenWithProps, (child, idx) => {
      this.refs[child.ref]._onChange(false);
    });
  },

  _resetValue() {
    this._refOptions.forEach(ref => {
      this.refs[ref].resetValue();
    })
  },

  render() {
    this._refOptions = [];
    this._childrenWithProps = React.Children.map(this.props.children, (child, idx) => {
      var val = child.props.value;
      var selected = child.props.selected;
      this._refOptions.push(this.props.name+'{'+val+'}')
      return React.cloneElement(child, {
        formStyles: this.props.formStyles,
        openModal: this.props.openModal,
        formName: this.props.formName,
        navigator: this.props.navigator,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onValidation: this.props.onValidation,
        onValueChange: this.props.onValueChange,

        name: this.props.name+'{'+val+'}',
        ref: this.props.name+'{'+val+'}',
        value: ('selected' in child.props) ? selected :  (this.props.value === val),
        unSelectAll: this.unSelectAll,
        rawValue: child.props.value,
        multiple: this.props.multiple,
        onClose: this.props.onClose, // got from ModalWidget
        onSelect: this.props.onSelect, // got from DayPickerWidget
      });
    });

    return (
      <View>
        {this._childrenWithProps}
      </View>
    );
  },
});
