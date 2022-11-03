import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Formats} from './src/Formats';
import {IPageData} from './src/Formats/types';
import {getAllFromStorage} from './src/utils/asyncStorage';

const App = () => {
  const [pageData, setPageData] = useState<IPageData>({
    currentPage: 1,
    totalPages: 0,
    location: 'titlepage.xhtml',
  });

  const handleChangePageData = (data: IPageData) => {
    setPageData(data);
  };

  useEffect(() => {
    const data = getAllFromStorage('currentPage', 'totalPages', 'location');

    data.then(response => {
      if (response) {
        setPageData({...pageData, ...response});
      }
    });
  }, [pageData]);

  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <Formats {...{pageData, handleChangePageData}} />
      </View>
    </SafeAreaView>
  );
};

export default App;
