import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native';
import { observer } from 'mobx-react/native';
import NewsService from '@app/services/models/NewsService';
import MessageToastService from '@app/services/MessageToastService';
import NewsItem from '@app/components/NewsItem';
import ListItemSeperator from '@app/components/ListItemSeperator';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  }
});

@observer
export default class extends React.Component {

  static onEnter = (props) => {
    const { category } = props;
    if (category && category._id) {
      Actions.refresh({
        title: category.title
      });
    }
  }

  componentDidMount() {
    this.getNews();
  }

  getNews = (refresh = true) => {
    const params = {};
    NewsService.queryItems(refresh, params)
      .catch(err => MessageToastService.showError('获取资讯错误', err.message));
  }

  renderItem = (props) => <NewsItem {...props} />

  render() {
    const { list: news, refreshing, hasMore } = NewsService;
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
        <StatusBar barStyle='dark-content' />
        <FlatList
          data={news}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          ItemSeparatorComponent={ListItemSeperator}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={this.getNews}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (hasMore) {
              this.getNews(false);
            }
          }}
        />
      </SafeAreaView>
    )
  }
}