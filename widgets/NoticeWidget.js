var React = require('react');
var {
  View,
  Text
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');



module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'NoticeWidget',
    };
  },

  render() {
    return (
      <View>
        <View style={this.getStyle('noticeRow')}>
          <Text
            style={this.getStyle('noticeTitle')}
            {...this.props}
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  },

  defaultStyles: {
    noticeRow: {
      backgroundColor:'#fafafa',
      paddingBottom: 5,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    noticeTitle: {
      fontSize: 13,
      color: '#9a9a9a',
    },
  },
});
