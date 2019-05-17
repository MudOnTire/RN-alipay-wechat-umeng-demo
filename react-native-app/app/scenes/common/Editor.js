import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable, toJS } from 'mobx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    padding: 20,
    fontSize: 16,
    lineHeight: 26,
    marginTop: 12,
    textAlignVertical: 'top',
    height: 300,
    color: '#333',
  }
});

@observer
class Editor extends React.Component {

  @observable content = this.props.initialContent;

  constructor(props) {
    super(props);
    const { initialContent, minLength, maxLength } = props;
    const isInitialContentValid = initialContent && initialContent.length > minLength && initialContent.length < maxLength;
    this.state = {
      contentValid: isInitialContentValid
    }
  }

  componentDidMount() {
    const { navigation, title } = this.props;
    navigation.setParams({ title });
    this.updateRightBtn();
  }

  updateRightBtn = () => {
    const { contentValid } = this.state;
    const { navigation, onConfirm } = this.props;
    navigation.setParams({
      right: () => (
        <TouchableOpacity
          disabled={!contentValid}
          style={{ paddingHorizontal: 16 }}
          onPress={() => { onConfirm(this.content) }}>
          <Text style={[AppSizes.navbarFont, { color: contentValid ? '#333' : '#ccc' }]}>
            完成
          </Text>
        </TouchableOpacity>
      ),
    });
  }

  onChangeText = (text) => {
    this.content = text;
    const { minLength, maxLength } = this.props;
    const { contentValid } = this.state;
    if (text.length >= minLength && text.length <= maxLength) {
      if (contentValid) return;
      this.setState({
        contentValid: true
      }, this.updateRightBtn);
    } else {
      if (!contentValid) return;
      this.setState({
        contentValid: false
      }, this.updateRightBtn);
    }
  }

  render() {
    const { maxLength, placeholder } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <TextInput
            autoFocus
            style={styles.input}
            placeholder={placeholder}
            maxLength={maxLength}
            multiline
            value={this.content}
            onChangeText={this.onChangeText}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

Editor.propTypes = {
  title: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  initialContent: PropTypes.string,
  placeholder: PropTypes.string,
  onConfirm: PropTypes.func
}

Editor.defaultProps = {
  title: '编辑',
  minLength: 20,
  maxLength: 1000,
  initialContent: null,
  placeholder: '请输入内容',
  onConfirm: () => { }
}

export default Editor;