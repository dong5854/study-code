import React from 'react';
import data from './data/dummy.json';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
export default function App() {

let items = data.items;
let total = 0;

return (
<ScrollView style={styles.container}>
  <Text style={styles.title}>쇼핑 계산기</Text>
  <View style={styles.memoList}>
  {
    items.map((content,i) => {
        total += (content.price-content.discount)*content.price;
        return (<View style={styles.memo} key={i}>
          <Text style={styles.component}>{content.name}</Text>
          <Text style={styles.component}>{content.price}원</Text>
          <Text style={styles.component}>{content.amount}개</Text>
          <Text style={styles.component}>{content.discount}원</Text>
        </View>)
      }
    )
  }
  <Text style={styles.result}>합계: {total}원</Text>
  </View>
</ScrollView>
);
}
const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: 'white',
  },
  title : {
    paddingTop: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
  },
  memo: {
    flex: 1,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  component: {

  },
  result: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    textAlign: 'lett',
  }
});
