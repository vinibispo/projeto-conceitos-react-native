import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Repository} from '../utils/types';

interface RepoProps {
  repo: Repository;
}
const Repo: React.FC<RepoProps> = ({repo}) => {
  const navigation = useNavigation();
  const dateFormatted = useMemo(() => {
    return format(new Date(repo.created_at), 'dd/MM/yyyy');
  }, [repo.created_at]);
  const navigateToRepoPage = useCallback(() => {
    navigation.navigate('Repo', {
      name: repo.name,
      owner: repo.owner.login,
      image: repo.owner.avatar_url,
    });
  }, [navigation, repo.name, repo.owner]);
  return (
    <View key={repo.id} style={styles.body}>
      <TouchableOpacity onPress={navigateToRepoPage}>
        <Text style={styles.sectionTitle}>{repo.name}</Text>
        <Text style={styles.sectionButton}>{dateFormatted}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  sectionButton: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: Colors.white,
  },
});
export default Repo;
