import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SynopsisScreen = () => {
  return (
    <View style={styles.container}>
      <Text>welcome to SIGNAL</Text>
    </View>
  );
};

export default SynopsisScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
