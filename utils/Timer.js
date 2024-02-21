import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {homePage} from '../constants/constants';

export default CustomHeader = ({showTimer}) => {
  const isFocused = useIsFocused();

  if (!showTimer) {
    return null;
  }
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    let interval;
    if (showTimer && isFocused) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showTimer, isFocused]);

  const formattedTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formattedDate = () => {
    const day = currentTime.getDate().toString().padStart(2, '0');
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const year = currentTime.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}> {homePage}</Text>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <Text style={styles.headerDate}>{formattedTime()} </Text>
        <Text style={styles.headerDate}>{formattedDate()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',

    paddingTop: 16,
  },

  headerDate: {
    fontSize: 14,
    color: '#121212',
    fontWeight: 'bold',
  },
});
