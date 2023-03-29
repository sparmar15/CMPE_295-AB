import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

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

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require('../Assets/logo.png'),
  );

  const handleEditImage = () => {
    // setEditMode(true);
    const options = {
      noData: true,
    };
    launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  const handleSaveImage = () => {
    setEditMode(false); // Save the new profile image to your database or storage service
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const options = [
    {id: '1', name: 'Edit Profile', icon: 'account-circle'},
    {id: '2', name: 'Address', icon: 'map'},
    {id: '3', name: 'Notification', icon: 'notifications'},
    {id: '4', name: 'Payment', icon: 'credit-card'},
    {id: '5', name: 'Security', icon: 'security'},
    {id: '6', name: 'Privacy Policy', icon: 'policy'},
    {id: '7', name: 'Help Center', icon: 'help'},
    {id: '8', name: 'Invite friends', icon: 'group'},
    {id: '9', name: 'Logout', icon: 'logout'},
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.option}>
      <View style={styles.optionIconContainer}>
        <MaterialIcon name={item.icon} size={24} color="#000" />
      </View>
      <Text style={styles.nameContainer}>{item.name}</Text>

      <View style={styles.optionArrowContainer}>
        <MaterialIcon name="keyboard-arrow-right" size={24} color="#000" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcon name="perm-contact-cal" size={24} color="navy" />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image source={profileImage} style={styles.profileImage} />

          <TouchableOpacity onPress={handleEditImage} style={styles.editIcon}>
            <MaterialIcon name="camera-alt" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    justifyContent: 'flex-start',
    textAlign: 'right',
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
    width: 128,
    height: 128,
    borderRadius: 64,
    marginVertical: 32,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 30,
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 8,
    zIndex: 1,
  },
  line: {
    height: 1,
    backgroundColor: '#000',
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
    marginLeft: 8,
  },
  optionArrowContainer: {
    flexDirection: 'row-reverse',
    flexGrow: 1,
  },
  nameContainer: {
    fontSize: 18,
  },
});

export default UserProfile;
