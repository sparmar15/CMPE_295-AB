import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  {
    id: '1',
    name: 'John Doe',
    image: require('../Assets/profile.png'),
    message: 'Hey, are you still available to carpool tomorrow?',
    unread: 3,
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: require('../Assets/profile.png'),
    message: 'Sure, what time do you want to meet?',
    unread: 0,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    image: require('../Assets/profile.png'),
    message: "Sorry, I won't be able to make it tomorrow",
    unread: 0,
  },
];

const InboxScreen = ({navigation}) => {
  const handleChatClick = () => {
    console.log('press');
    navigation.navigate('Chat');
  };

  const renderChat = ({item}) => (
    <TouchableOpacity style={styles.chat} onPress={handleChatClick()}>
      <Image source={item.image} style={styles.chatImage} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.chatUnread}>
          <Text style={styles.chatUnreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="chat" size={36} />
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>
      <View style={styles.line} />
      <FlatList
        data={DATA}
        renderItem={renderChat}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 8,
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#444444',
  },
  chatMessage: {
    fontSize: 14,
    color: '#666666',
  },
  chatUnread: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatUnreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default InboxScreen;
