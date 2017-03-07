var React = require('react');
var {
  View,
  WebView,
  TextInput,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');

class RichTextEditor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let initValueStr;
    if (this.props.initValue) {
      initValueStr = JSON.stringify(this.props.initValue)    
      initValueStr = initValueStr.replace(/\'/g, "\\'")
    }    
    let placeholder = this.props.placeholder
    return (
      <View style={{flex:1}}>
        <WebView
          ref={webview => { this.props.onWebviewRef ? this.props.onWebviewRef(webview) : null }}
          source={this.props.source}
          style={[this.props.style]}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={false}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          onMessage={this.props.onMessage}
          onLoad={this.props.onLoad}
          injectedJavaScript={ initValueStr ? `window.renderEditor('${initValueStr}', '${placeholder}')` : `window.renderEditor(null, null)`}
        />
      </View>
    );
  }
}

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
      this._saveCallback && this._saveCallback();      
    }
  },

  saveCallback(cb) {
    this._saveCallback = cb;
    if (this.webviewRef) {
      let message = {
        type: 'save'
      }
      this.webviewRef.postMessage(JSON.stringify(message));
    } else {
      console.log('No webview available')
    }
  },

  render() {
    let initValue;    
    if (this.state.value && this.state.value.json) {
      initValue = this.state.value.json;
    }
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
      flex:1,
      height: 400
    },
  },

});
