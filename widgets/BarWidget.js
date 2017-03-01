var React = require('react');
var {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');



module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return ({
      // onChange: null,
      type: 'BarWidget',
    });
  },

  render() {
    return (
      <View
        style={this.getStyle('rowContainer')}
        {...this.props}>
          <View style={this.getStyle('row')}>
            {this._renderImage()}
            <Text numberOfLines={1} style={this.getStyle('switchTitle')}>
              {this.props.title}
            </Text>
          </View>
      </View>
    );
  },

  defaultStyles: {
    rowImage: {
      height: 40,
      width: 40,
      marginLeft: 10,
      borderRadius: 5,
    },
    checkmark: {
      width: 30,
      marginRight: 10,
      marginLeft: 10,
    },
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
      paddingBottom:10
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    underlayColor: '#c7c7cc',
    switchTitle: {
      fontSize: 18,
      color: '#5E5959',
      paddingLeft: 10,
    },
  },
});
