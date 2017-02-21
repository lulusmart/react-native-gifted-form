'use strict';

import React, { PropTypes } from 'react';
import tweenState from 'react-tween-state';

import {
  StyleSheet,
  TouchableHighlight,
  View,
  ScrollView,
  Text
} from 'react-native';

var Accordion = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    activeOpacity: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    content: React.PropTypes.element.isRequired,
    easing: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    header: React.PropTypes.element.isRequired,
    onPress: React.PropTypes.func,
    underlayColor: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      activeOpacity: 1,
      animationDuration: 300,
      easing: 'linear',
      expanded: false,
      underlayColor: '#000',
      style: {}
    };
  },

  getInitialState() {
    return {
      is_visible: this.props.expanded,
      height: 0,
      content_height: 0
    };
  },

  close() {
    this.state.is_visible && this.toggle();
  },

  open() {
    !this.state.is_visible && this.toggle();
  },

  toggle() {
    this.state.is_visible = !this.state.is_visible;

    this.tweenState('height', {
      easing: tweenState.easingTypes[this.props.easing],
      duration: this.props.animationDuration,
      endValue: this.state.height === 0 ? this.state.content_height : 0
    });
  },

  _onPress() {
    //this.toggle();

    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  },

  _getContentHeight() {
    if (this.AccordionContent) {
      this.AccordionContent.measure((ox, oy, width, height, px, py) => {
        // Sets content height in state
        this.setState({
          height: this.props.expanded ? height : 0,
          content_height: height
        });
      });
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      this.state.is_visible = nextProps.expanded;
      if (this.props.expanded) {
        this.state.height = 0;
        this.tweenState('height', {
          easing: tweenState.easingTypes[this.props.easing],
          duration: this.props.animationDuration,
          beginValue: this.state.content_height,
          endValue: 0
        });
      } else {
        this.tweenState('height', {
          easing: tweenState.easingTypes[this.props.easing],
          duration: this.props.animationDuration,
          endValue: this.state.content_height
        });
      }
    }
  },

  componentDidMount() {
    // Gets content height when component mounts
    // without setTimeout, measure returns 0 for every value.
    // See https://github.com/facebook/react-native/issues/953
    setTimeout(this._getContentHeight);
  },

  render() {
    return (
      /*jshint ignore:start */
      <View
        style={{
          overflow: 'hidden'

        }}
      >
        <TouchableHighlight
          ref="AccordionHeader"
          onPress={this._onPress}
          underlayColor={this.props.underlayColor}
          style={this.props.style}
        >
          {this.props.header}
        </TouchableHighlight>
        <ScrollView
          ref="AccordionContentWrapper"
          style={{
            height: this.getTweeningValue('height')
          }}
        >
          <View ref={ (AccordionContent) => { this.AccordionContent = AccordionContent} } collapsable={false} >
            {this.props.content}
          </View>
        </ScrollView>
      </View>
      /*jshint ignore:end */
    );
  }
});

module.exports = Accordion;
