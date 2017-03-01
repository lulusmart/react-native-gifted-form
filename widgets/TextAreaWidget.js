var React = require('react');
var {
  View,
  TextInput,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'TextAreaWidget',
    };
  },

  render() {
    return (
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={this.getStyle('textAreaRow')}
          multiline={true}

          {...this.props}

          onFocus={() => this.props.onFocus(true)}
          onChangeText={this._onChange}
          value={this.state.value}
        />
    );
  },

  defaultStyles: {
    textAreaRow: {
      flex:1,
      paddingLeft:15,
      paddingRight:15,
      paddingBottom:10,
      fontSize:16,
      backgroundColor:'white',
      height: 200,
    },
    textArea: {
      fontSize: 15,
    },
  },

});
