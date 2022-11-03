import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(
      key,
      typeof value !== 'string' ? JSON.stringify(value) : value,
    );
  } catch (e) {
    console.warn(e);
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.warn(e);
  }
  return null;
};

export const getAllFromStorage = async (...keys: string[]) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    if (values !== null) {
      return Object.fromEntries(values);
    }
  } catch (e) {
    console.warn(e);
  }
  return null;
};

export const clearStorage = () => {
  AsyncStorage.clear();
};
