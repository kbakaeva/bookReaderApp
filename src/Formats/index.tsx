import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Reader, ReaderProvider} from '@epubjs-react-native/core';
import {useFileSystem} from '@epubjs-react-native/file-system';
import {IPageData} from './types';
import {clearStorage, setToStorage} from '../utils/asyncStorage';
import {styles} from './styles';

const epub =
  'https://altmshfkgudtjr.github.io/react-epub-viewer/files/Alices%20Adventures%20in%20Wonderland.epub';

const opf = 'https://s3.amazonaws.com/moby-dick/OPS/package.opf';

type FormatsProps = {
  pageData: IPageData;
  handleChangePageData: (data: IPageData) => void;
};

export function Formats({pageData, handleChangePageData}: FormatsProps) {
  const [src, setSrc] = useState(epub);
  const {width, height} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeBook = (source: string) => {
    setSrc(source);
    handleChangePageData({
      currentPage: 1,
      totalPages: 0,
      location: 'titlepage.xhtml',
    });
    clearStorage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ReaderProvider>
        <Reader
          src={src}
          width={width}
          height={height * 0.8}
          fileSystem={useFileSystem}
          initialLocation={pageData.location}
          onLocationChange={(totalLocations, currentLocation: any) => {
            if (!currentLocation || !totalLocations) {
              return null;
            }
            const page = currentLocation.start.location;
            const href = currentLocation.start.href;
            setToStorage('currentPage', page);
            setToStorage('totalPages', totalLocations);
            setToStorage('location', href);
          }}
          onStarted={() => setIsLoading(true)}
          onLocationsReady={() => setIsLoading(false)}
        />
      </ReaderProvider>
      <View style={styles.options}>
        <TouchableOpacity
          disabled={src === epub}
          style={styles.book_btn}
          onPress={() => handleChangeBook(epub)}>
          <Text style={styles.btn_text}>Alice's Adventures In Wonderland</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={src === opf}
          style={styles.book_btn}
          onPress={() => handleChangeBook(opf)}>
          <Text style={styles.btn_text}>Moby Dick or The whale</Text>
        </TouchableOpacity>
        {(!!pageData.totalPages || !!pageData.currentPage) && !isLoading && (
          <Text>{`${pageData.currentPage} / ${pageData.totalPages}`}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
