var React = require('react');
var {
  View,
  Text,
  TextInput,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');
var Accordion = require('./Accordion');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      inline: true,
      // @todo type avec suffix Widget pour all
      type: 'TextInputWidget',
      underlined: false,
      onTextInputFocus: (value) => value,
      onTextInputBlur: (value) => value
    }
  },

  getInitialState() {
    return {
      focused: false,
    }
  },

  _renderTitle() {
    if (this.props.title !== '') {
      return (
        <Text
          numberOfLines={1}
          style={this.getStyle(['textInputTitleInline'])}
        >
          {this.props.title}
        </Text>
      );
    }
    return (
      <View style={this.getStyle(['spacer'])}/>
    );
  },

  close() {
    this.refNode.close();
  },

  open() {
    this.refNode.open();
  },

  _renderRow() {

    if (this.props.inline === false) {
      return (
        <View style={this.getStyle(['rowContainer'])}>
          <Accordion
            animationDuration={300} header={<View />}
            expanded={this.props.expanded}
            ref={ref => this.refNode = ref}
            content={
              <View>
                <View style={this.getStyle(['titleContainer'])}>
                  {this._renderImage()}
                  <Text numberOfLines={1} style={this.getStyle(['textInputTitle'])}>{this.props.title}</Text>
                </View>

                <TextInput
                  underlineColorAndroid='rgba(0,0,0,0)'
                  ref='input'
                  style={this.getStyle(['textInput'])}

                  {...this.props}

                  onFocus={this.onFocus}
                  onBlur={this.onBlur}


                  onChangeText={this._onChange}
                  value={this.state.value}
                />
              </View>
            }
          />          
          {this._renderValidationError()}
          {this._renderUnderline()}
        </View>
      );
    }
    return (
      <View style={this.getStyle(['rowContainer'])}>
        <View style={this.getStyle(['row'])}>
          {this._renderImage()}
          {this._renderTitle()}
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            ref='input'
            style={this.getStyle(['textInputInline'])}

            {...this.props}
            placeholder={this.state.focused ? '' : this.props.placeholder}
            onFocus={this.onFocus}
            onBlur={this.onBlur}

            onChangeText={this._onChange}
            value={this.state.value}
          />
        </View>
        {this._renderValidationError()}
        {this._renderUnderline()}
      </View>
    );

  },

  onFocus() {
    this.setState({
      focused: true,
    });
    this.props.onFocus();
    let oldText = this.state.value;
    let newText = this.props.onTextInputFocus(this.state.value);
    if (newText !== oldText) {
      this._onChange(newText);
    }
  },

  onBlur() {
    this.setState({
      focused: false,
    });
    this.props.onBlur();
    this.props.onTextInputBlur(this.state.value);
  },



  _renderUnderline() {
    if (this.props.underlined === true) {
      if (this.state.focused === false) {
        return (
          <View
            style={this.getStyle(['underline', 'underlineIdle'])}
          />
        );
      }
      return (
        <View
          style={this.getStyle(['underline', 'underlineFocused'])}
        />
      );
    }
    return null;
  },

  render() {
    return this._renderRow();
  },

  defaultStyles: {
    rowImage: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    underline: {
      marginRight: 10,
      marginLeft: 10,
    },
    underlineIdle: {
      borderBottomWidth: 2,
      borderColor: '#c8c7cc',
    },
    underlineFocused: {
      borderBottomWidth: 2,
      borderColor: '#3498db',
    },
    spacer: {
      width: 10,
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
    titleContainer: {
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // selfAlign: 'center',
      // backgroundColor: '#ff0000',
    },
    textInputInline: {
      fontSize: 15,
      flex: 1,
      textAlign: 'right',
      paddingRight:10,
      height: 40,// @todo should be changed if underlined
      marginTop: 2,
    },
    textInputTitleInline: {
      width: 150,
      fontSize: 16,
      color: '#8892ad',
      paddingLeft: 10,
    },
    textInputTitle: {
      fontSize: 13,
      color: '#8892ad',
      paddingLeft: 10,
      flex: 1
    },
    textInput: {
      fontSize: 15,
      flex: 1,
      height: 40,
      marginLeft: 10,
      paddingLeft: 0
    },
  },
});
