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
      type: 'RichTextWidget',
    };
  },

  onMessage(event) {
    let data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'updated') {
      return this.setState({updated: true})
    }
    if (data.type === 'content') {      
      this._onChange({
        json: data.payload,
        html: data.payload_html
      })      
    }
  },

  render() {
    return (      
      <RichTextEditor
        initValue={initValue}
        {...this.props}
        onMessage={this.onMessage.bind(this)}
        onWebviewRef={ref => this.webviewRef = ref}
        source={require('./richedit.html')}
        style={this.getStyle('richTextArea')}/>
    );
  },

  defaultStyles: {    
    richTextArea: {
      height: 600
    },
  },

});
