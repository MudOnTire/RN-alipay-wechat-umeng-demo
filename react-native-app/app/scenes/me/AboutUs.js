import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spacer from '@app/components/Spacer';
import { AppConfig } from '@app/constants';
import { phonecall } from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentBox: {
    backgroundColor: '#fff',
    padding: 15
  },
  content: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
    color: "#333333",
  },
  sectionTitle: {
    fontSize: 15,
    color: "#333333",
    marginRight: 10
  },
  phoneBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff'
  },
  phone: {
    fontSize: 14,
    lineHeight: 16,
    color: "#666666",
    marginRight: 10
  },
  logoContainer: {
    height: 170,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120
  },
  appName: {
    fontSize: 15,
    color: '#333',
    lineHeight: 25,
    fontWeight: "bold"
  },
  rightNavBtn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    marginTop: 40,
    paddingBottom: 10,
    flex: 1
  },
  footerText: {
    fontSize: 9,
    color: "#aaa",
    textAlign: "center"
  },
  qrcode: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20
  }
});

export default class extends React.Component {

  render() {

    return (
      <SafeAreaView
        forceInset={{ top: 'never', bottom: 'never' }}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image source={require("@app/assets/app-logo.png")} style={styles.logo} />
            <Text style={styles.appName}>
              {`语众不同  v${AppConfig.appVersion}`}
            </Text>
          </View>
          <View style={{ backgroundColor: "#fff", padding: 16 }}>
            <Text style={{ fontSize: 16, color: "#333" }}>产品简介</Text>
            <Text style={{ fontSize: 14, color: "#333", marginTop: 20, lineHeight: 20 }}>
              {`        江苏玺礼教育自成立以来，一直专注于教育培训行业，努力打造具有玺礼特色的教学内容及教学体系。主要经营范围：日语高考教学、艺考（美术、传媒）、中小学教师培训等几大方向。
            
        玺礼教育以日语教学为核心，多年来一直在探索日语教学最科学的流程和方法，在实践过程中逐步形成了一整套具备鲜明玺礼特色的教学方法及教辅资料，并与南京大学外国语学院、东南大学外国语学院、中日教学研究学会等建立了良好的战略合作关系。目前在南京、苏州、扬州、南通、徐州、淮安等地设有大型教育基地。

        玺礼拥有良好的学习机制及教学方案、同时也注重公司企业文化的推进，并尽可能为所有员工提供学习的氛围和机会，定期组织员工不断学习和探讨最先进的教育思想和理念，努力提升自身的业务能力和素质。`}
            </Text>
          </View>
          <Spacer size={10} />
          <TouchableOpacity
            style={styles.phoneBox}
            onPress={() => { phonecall('02558819297', true) }}
          >
            <Text style={styles.sectionTitle}>联系我们</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.phone}>025—58819297</Text>
              <Icon name='phone' size={14} color='#666' />
            </View>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>南京玺礼教育股份有限公司</Text>
            <Text style={styles.footerText}>© 2019 www.xilijiaoyu.com All rights reserved</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}