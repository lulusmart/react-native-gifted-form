var React = require('react');
var {
  View,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SeparatorWidget',
    };
  },

  render() {
    return (
      <View
        style={this.getStyle('separator')}
        {...this.props}
      />
    );
  },

  defaultStyles: {
    separator: {
      height: 20,
      backgroundColor:'#fafafa',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
  },

});
