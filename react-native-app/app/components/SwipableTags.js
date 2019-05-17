import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '@app/theme/';

const styles = StyleSheet.create({
  tag: {
    paddingTop: 16,
    height: 40,
    marginHorizontal: 12,
  }
})

export default class SwipableTags extends Component {

  //水平滚动tag
  _renderItem = ({ item, index, separators }) => {
    let { selectedTagId } = this.props;
    if (!selectedTagId) selectedTagIndex = 0;
    const selected = item._id === selectedTagId;
    const tintColor = this.props.tintColor;
    return (
      <TouchableOpacity style={styles.tag} onPress={() => { this._onPressTag(item, index); }}>
        <Text style={[selected ? { color: tintColor } : { color: '#aaa' }, { fontSize: 17 }]}>
          {item.title}
        </Text>
        {
          selected &&
          <View style={{ height: 3, backgroundColor: tintColor, marginTop: 6 }} />
        }
      </TouchableOpacity>
    );
  }

  _onPressTag = (item, index) => {
    if (this.props.onPressTag) {
      this.props.onPressTag(item, index);
    }
  }

  render() {
    const { backgroundColor, selectedTagIndex } = this.props;
    return (
      <View style={{ height: 50 }}>
        <FlatList
          data={this.props.tags}
          renderItem={this._renderItem}
          horizontal
          keyExtractor={item => item._id}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor }}
          extraData={{ selectedTagId: selectedTagIndex }}
        />
      </View>
    )
  }
}

SwipableTags.propTypes = {
  tags: PropTypes.array.isRequired,
  selectedTagId: PropTypes.string,
  onPressTag: PropTypes.func,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

SwipableTags.defaultProps = {
  tintColor: '#333',
  backgroundColor: "#fff",
};


