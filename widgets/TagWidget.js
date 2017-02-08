var React = require('react');
var {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} = require('react-native')
var Tag = require('./Tag');
var WidgetMixin = require('../mixins/WidgetMixin.js');
var TimerMixin = require('react-timer-mixin');


module.exports = React.createClass({
  mixins: [TimerMixin, WidgetMixin],

  getDefaultProps() {
    return {
      type: 'RowWidget',
      onPress: () => {},
      disclosure: true,
    };
  },

  _renderDisclosure() {
    if (this.props.disclosure === true) {
      return (
        <Image
          style={this.getStyle('disclosure')}
          resizeMode={Image.resizeMode.contain}
          source={require('../icons/disclosure.png')}
        />
      );
    }
    return null;
  },

  render() {
    return (
      <View style={[this.getStyle('rowContainer'), this.props.style]}>
          <View style={this.getStyle('row')}>
            <Tag
              value={this.props.value}
              numberOfLines={2}
            />
          </View>
      </View>
    );
  },

  defaultStyles: {
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    row: {
      height:80,
      flexDirection: 'row',
      paddingLeft: 10,
    },
    underlayColor: '#c7c7cc',
    disclosure: {
      transform: [{rotate: '-90deg'}],
      marginLeft: 10,
      marginRight: 10,
      width: 11,
    },
    title: {
      flex: 1,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
  },
});
