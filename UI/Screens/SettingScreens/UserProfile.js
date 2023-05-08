import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../Utils/web3Auth';
import {logger} from 'react-native-logs';
import {userLogout} from '../../../Redux/Actions/UserActions';

const createFormData = (photo, body = {}) => {
  const data = new FormData();
  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

const UserProfile = ({navigation}) => {
  const Log = logger.createLogger();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    useSelector(state => state.userInfo.userInfo.profileImage),
  );
  const [userInfo, setUserInfo] = useState(
    useSelector(state => state.userInfo.userInfo),
  );

  const handleEditImage = () => {
    setEditMode(true);
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
    // console.log(userInfo.profileImage);
  };

  const handleSaveImage = () => {
    setEditMode(false); // Save the new profile image to your database or storage service
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const options = [
    {id: '1', name: 'Edit Profile', icon: 'create-outline'},
    {id: '2', name: 'Address', icon: 'navigate-outline'},
    {id: '3', name: 'Notification', icon: 'notifications-outline'},
    {id: '4', name: 'Payment', icon: 'card-outline'},
    {id: '5', name: 'Security', icon: 'lock-closed-outline'},
    {id: '6', name: 'Privacy Policy', icon: 'newspaper-outline'},
    {id: '7', name: 'Help Center', icon: 'information-circle-outline'},
    {id: '8', name: 'Invite friends', icon: 'people-outline'},
    {id: '9', name: 'Logout', icon: 'log-out-outline'},
  ];

  const handleOptionPress = option => {
    if (option === 'Logout') {
      console.log('Logout pressed');
      logout();
      dispatch(userLogout());
      navigation.navigate('Login');
    } else {
      // Handle other options
      console.log('Option pressed:', option);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleOptionPress(item.name)}>
      <View style={styles.optionIconContainer}>
        <Ionicons
          name={item.icon}
          size={24}
          color={item.name === 'Logout' ? 'red' : '#000'}
        />
      </View>
      <Text
        style={[
          styles.nameContainer,
          {color: item.name === 'Logout' ? 'red' : 'black'},
        ]}>
        {item.name}
      </Text>

      <View style={styles.optionArrowContainer}>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={item.name === 'Logout' ? 'red' : 'black'}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Ionicons name={'settings-outline'} size={36} color="blue" />
        <Text style={styles.header}>Settings</Text>
      </View> */}
      {/* <Button
        title="Go to Search Page"
        onPress={() =>
          navigation.navigate('Home', {screen: 'SearchPage'})
        }></Button> */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />

          <TouchableOpacity onPress={handleEditImage} style={styles.editIcon}>
            <Ionicons name="camera-sharp" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userContact}>{userInfo.email}</Text>

        <View style={styles.line} />

        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 25,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 8,
    zIndex: 1,
  },
  line: {
    height: 1,
    backgroundColor: '#c7c7c7',
    opacity: 50,
    width: '100%',
    marginTop: 15,
    marginBottom: 8,
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    width: '100%', // alignItems: 'baseline',
    paddingVertical: 12,
    paddingHorizontal: 8, // borderBottomWidth: 1, // borderBottomColor: '#E5E5E5',
  },
  optionIconContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    // marginLeft: 8,
  },
  optionArrowContainer: {
    flexDirection: 'row-reverse',
    flexGrow: 1,
  },
  nameContainer: {
    fontSize: 18,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  userContact: {
    fontSize: 16,
    color: 'gray',
  },
});

export default UserProfile;
