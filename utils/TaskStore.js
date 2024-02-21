import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const saveData = data => {
  storage.set('data', JSON.stringify(data));
};
const getData = () => {
  const data = storage.getString('data');
  return data ? JSON.parse(data) : [];
};

const updateData = newData => {
  const existingData = getData();
  const updatedData = existingData.map(item => {
    if (item.id === newData.id) {
      return {...item, ...newData};
    }
    return item;
  });
  saveData(updatedData);
};

export const TaskStore = {
  saveData,
  getData,
  updateData,
};
