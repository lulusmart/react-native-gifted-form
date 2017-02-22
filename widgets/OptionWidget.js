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
      type: 'OptionWidget',
    });
  },

  _renderCheckmark() {
    if (this.state.value === true) {
      return (
        <Image
          style={this.getStyle('checkmark')}
          resizeMode={Image.resizeMode.contain}
          source={require('../icons/new_select.png')}
        />
      );
    } else {
      return (
        <Image
          style={this.getStyle('checkmark')}
          resizeMode={Image.resizeMode.contain}
          source={require('../icons/unselect2.png')}
        />
      );
    }
  },

  _onChangeValue() {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.props.rawValue);
    }
    if (this.props.multiple === false) {
      this.props.unSelectAll();
    }
    this._onChange(!this.state.value);
  },

  render() {
    return (
      <View style={this.getStyle('rowContainer')}>
        <TouchableHighlight
          onPress={this._onChangeValue}
          underlayColor={this.getStyle('underlayColor').pop()}
          {...this.props}
        >
          <View style={this.getStyle('row')}>
            {this._renderImage()}
            <Text numberOfLines={1} style={this.getStyle('switchTitle')}>
              {this.props.title}
            </Text>
            {this._renderCheckmark()}
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  defaultStyles: {
    rowImage: {
      height: 40,
      width: 40,
      marginLeft: 10,
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
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    underlayColor: '#c7c7cc',
    switchTitle: {
      fontSize: 15,
      color: '#000',
      flex: 0.7,
      paddingLeft: 10,
    },
  },
});
