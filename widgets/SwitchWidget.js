var React = require('react');
var {
  View,
  Text,
  Platform,
  PixelRatio
} = require('react-native')
var Switch = require('./Switch');
var WidgetMixin = require('../mixins/WidgetMixin.js');

var GiftedSwitch = React.createClass({
  _getSwitch() {
    return (
      <Switch
        {...this.props}
        active={this.props.value}
        onChangeState={this.props.onValueChange}
        buttonRadius={12}
        switchWidth={40}
        switchHeight={15}
        inactiveButtonColor={'#EAEAEA'}
        inactiveButtonPressedColor={'#cccccc'}
        activeButtonColor={'#EAEAEA'}
        activeButtonPressedColor={'#cccccc'}
        activeBackgroundColor={'#3FC380'}
        switchAnimationTime={150}
      />
    );
  },
  render() {
    return (
      <View>
        {this._getSwitch()}
      </View>
    );
  },
});



module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SwitchWidget',
    };
  },

  render() {
    return (
      <View style={this.getStyle('rowContainer')}>
        <View style={this.getStyle('row')}>
          {this._renderImage()}

          <Text numberOfLines={1} style={this.getStyle('switchTitle')}>{this.props.title}</Text>
          <View style={this.getStyle('switchAlignRight')}>
            <GiftedSwitch
              style={this.getStyle('switch')}
              {...this.props}

              onValueChange={(value) => {
                this._onChange(value);
                this.props.onChange && this.props.onChange(value);
              }}
              value={this.state.value}
            />
          </View>
        </View>
        {this._renderValidationError()}
      </View>
    );
  },

  defaultStyles: {
    rowImage: {
      height: 20,
      width: 20,
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
    switchTitle: {
      fontSize: 13,
      color: '#8892ad',
      flex: 1,
      paddingLeft: 10,
    },
    switchAlignRight: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    switch: {
    },
  },
});
