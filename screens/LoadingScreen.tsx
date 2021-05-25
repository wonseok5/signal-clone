import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>로딩중....</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
