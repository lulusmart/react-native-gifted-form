// @flow

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import _ from 'lodash';

const { width } = Dimensions.get('window');

type Props = {
  /**
   * An array of tags
   */
    value: Array<any>,
  /**
   * A RegExp to test tags after enter, space, or a comma is pressed
   */
    regex?: Object,
  /**
   * Background color of tags
   */
    tagColor?: string,
  /**
   * Text color of tags
   */
    tagTextColor?: string,
  /**
   * Color of text input
   */
    inputColor?: string,
  /**
   * TextInput props Text.propTypes
   */
    inputProps?: Object,
  /**
   * path of the label in tags objects
   */
    labelKey?: string,
  /**
   *  maximum number of lines of this component
   */
    numberOfLines: number,
};

type State = {
  text: string,
  inputWidth: ?number,
  lines: number,
};

type NativeEvent = {
  target: number,
  key: string,
  eventCount: number,
  text: string,
};

type Event = {
  nativeEvent: NativeEvent,
};

const DEFAULT_SEPARATORS = [',', ' ', ';', '\n'];
const DEFAULT_TAG_REGEX = /(.+)/gi

class Tag extends Component {
  static propTypes = {
    value: PropTypes.array.isRequired,
    regex: PropTypes.object,
    tagColor: PropTypes.string,
    tagTextColor: PropTypes.string,
    inputColor: PropTypes.string,
    inputProps: PropTypes.object,
    labelKey: PropTypes.string,
    numberOfLines: PropTypes.number,
  };

  props: Props;
  state: State = {
    text: '',
    inputWidth: null,
    lines: 1,
  };

  wrapperWidth = width;

  // scroll to bottom
  contentHeight: 0;
  scrollViewHeight: 0;

  static defaultProps = {
    tagColor: '#dddddd',
    tagTextColor: '#777777',
    inputColor: '#777777',
    numberOfLines: 2,
  };

  onBlur = (event: Event) => {
    if (!event || !event.nativeEvent || !this.props.parseOnBlur)
      return;

    const text = event.nativeEvent.text;
    this.setState({ text: text });
    this.parseTags();
  };

  parseTags = () => {
    const { text } = this.state;
    const { value } = this.props;

    const regex = this.props.regex || DEFAULT_TAG_REGEX;
    const results = text.match(regex);

    if (results && results.length > 0) {
      this.setState({ text: '' });
    }
  };

  onKeyPress = (event: Event) => {
    if (this.state.text === '' && event.nativeEvent && event.nativeEvent.key == 'Backspace') {
      this.pop();
    }
  };

  focus = () => {
    if (this.refs.tagInput)
      this.refs.tagInput.focus();
  };

  pop = () => {
    const tags = _.clone(this.props.value);
    tags.pop();
    this.focus();
  };

  removeIndex = (index: number) => {
    const tags = _.clone(this.props.value);
    tags.splice(index, 1);
    this.focus();
  };

  _getLabelValue = (tag) => {
    const { labelKey } = this.props;

    if (labelKey) {
      if (labelKey in tag) {
        return tag[labelKey];
      }
    }

    return tag;
  };

  _renderTag = (tag, index) => {
    const { tagColor, tagTextColor } = this.props;

    return (
      <View
        key={index}
        ref={'tag' + index}
        style={[styles.tag, { backgroundColor: tagColor }, this.props.tagContainerStyle]}>
        <Text style={[styles.tagText, { color: tagTextColor }, this.props.tagTextStyle]}>
          {this._getLabelValue(tag)}
        </Text>
      </View>
    );
  };

  scrollToBottom = (animated: boolean = true) => {
    if (this.contentHeight > this.scrollViewHeight) {
      this.refs.scrollView.scrollTo({
        y: this.contentHeight - this.scrollViewHeight,
        animated,
      });
    }
  };

  render() {
    const { text, inputWidth, lines } = this.state;
    const { value, inputColor } = this.props;

    const defaultInputProps = {
      autoCapitalize: 'none',
      autoCorrect: false,
      placeholder: 'Start typing',
      returnKeyType: 'done',
      keyboardType: 'default',
      underlineColorAndroid: 'rgba(0,0,0,0)',
    }

    const inputProps = { ...defaultInputProps, ...this.props.inputProps };
    return (
      <View style={[styles.container]}>
        <View
          style={[styles.wrapper]}
          ref="wrapper"
        >
          <ScrollView
            ref='scrollView'
            style={styles.tagInputContainerScroll}
          >
            <View style={styles.tagInputContainer}>
              {value.map((tag, index) => this._renderTag(tag, index))}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'flex-start',
  },
  tagInputContainerScroll: {
    flex: 1,
  },
  tagInputContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInput: {
    height: 36,
    fontSize: 16,
    flex: .6,
    marginBottom: 6,
    padding: 0,

  },
  textInputContainer: {
    height: 36,
  },
  tag: {
    justifyContent: 'center',
    marginBottom: 5,
    marginRight: 3,
    padding: 8,
    height: 24,
    borderRadius: 2,
  },
  tagText: {
    padding: 0,
    margin: 0,
  },
});

module.exports = Tag;
