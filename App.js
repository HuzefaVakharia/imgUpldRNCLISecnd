//Successfull uploading one image using Two different buttons one to select image and second to upload image to server.                                                                                                                                 //import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import * as ImagePicker from 'react-native-image-picker';
// create a component
const App = () => {
  const [images, setimages] = React.useState(null);
  const [filePath, setFilePath] = useState({});
  const [imageRef, setImageRef] = useState(null);
  const [imagesRef, setImagesRef] = useState([]);
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, images => {
      console.log('images = ', images);

      if (images.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (images.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (images.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (images.errorCode == 'others') {
        alert(images.errorMessage);
        return;
      }
      console.log('base64 -> ', images.assets[0].base64);
      console.log('uri -> ', images.assets[0].uri);
      console.log('width -> ', images.assets[0].width);
      console.log('height -> ', images.assets[0].height);
      console.log('fileSize -> ', images.assets[0].fileSize);
      console.log('type -> ', images.assets[0].type);
      console.log('fileName -> ', images.assets[0].fileName);
      setFilePath(images.assets[0]);
      setImageRef(images.assets[0].uri);
      alert('images.assets[0].uri2: ' + images.assets[0].uri);
      //uploadImageAndStringForAddNewOrder(imageRef);
    });
  };

  const uploadImageAndStringForAddNewOrder = async uri => {
    alert('uploadImageAndStringForAddNewOrder executing');
    //setIsLoading(true);
    //gotoOrderScreen();
    //alert('Order ID is:'+orderIDToEdit);

    // Check if any file is selected or not

    // alert('Single file is not null');

    const formdata = new FormData();
    formdata.append(
      'image_file[]',

      {
        uri: uri,
        type: filePath.type,
        name: filePath.fileName,
      },
    );

    formdata.append('customer_id', '5');
    formdata.append('supplier_id', '2');
    formdata.append('category_id', '2');
    formdata.append('order_date', '2023-09-12');
    formdata.append('order_for', 'Client');
    formdata.append('order_type', 'Gold');
    formdata.append('item', 'ImageUploadTest55');
    formdata.append('carret_id', '2');
    formdata.append('color_id', '1');
    formdata.append('qty', '11');
    formdata.append('size', 'xlxlxlx');
    formdata.append('narration', 'testing Image Upload from RNCLI');
    formdata.append('delivery_date', '2023-09-20');

    formdata.append('hallmark', 'isi');
    formdata.append('priority', 'normal');

    alert('Form Data created successfully.');
    try {
      let res = await fetch(
        'https://rajeshwersoftsolution.com/jwelcart/api/insert_order',
        {
          method: 'post',
          body: formdata,
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTY5ZWNkOTZiYWQxMWQ1ODJmM2I1MDc2YTdiYjdkMmQ2ZjAxMzhmMTRmYzBiNzM2Nzc2OTRiNDg1M2QyNDdkMjNiOTZjYmNjODM2NzY4ZDYiLCJpYXQiOjE2OTQ1MTkwNzksIm5iZiI6MTY5NDUxOTA3OSwiZXhwIjoxNzI2MTQxNDc5LCJzdWIiOiI0OSIsInNjb3BlcyI6W119.e3S12YqAivo9Abp6ka31RAwZX1JJB8-Bu_1v4Lj6mjJNLJIVZX4Yy4BH3woBuYghICcXrPe5JbRUB7Z5bx95JBKX-dg2rOEqYcIRBI94LvDd-M_3JzowIY5n6Pl9udE0rUaqeKmquvWikQanBUHdMDqf4yWjgzhL6_iIAXxKMnqEDJwOBIQRSVS7ST5KGa6IVMLq3hu5UAmyF2hUIzRupXCfQM5CxJVXYFDBvmbXYb6XXTdkx8GJps57YaVIWNwHg6GVRKLzINmQ2jqYXSSqsLuKADeUK8ebmyMbuWe2s1Rz173JDftLVB1vXEfk3EtgLvp2rLOlHiW6fIN4b1P2ihTVHQiw0BMZw15xX76OuJ_HUcGFW6VfS3LkvWMB6qewB_c1b7g8vva8movr6ZvgA3dg1EnzYxfvCxiMB9MVWZaYobRaFr9u0W35bdD8iAuVuGWCppyv14z6VislLKB4Y_G6NnoZ3zG6coLtxuzUzyXKWfFIOu_VJ7QWRnys8IvtT1nxH-Sq2lq5KKQUKLRBHXEif7KU01hGjZ9yPVnqVdt3KBug0z2cYhIzHp4SjRs3oSS5YkjnwMOcWbuRGuHeMZ3YDrmxqgM3N-KRpjIWJySLSuEUyjzHLAuQTOG4SdLKRPBgGfYmx3q6HbgLS8KKwD3isHyt70UcjlQvwzB2ITA',
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      let result = await res.json();
      console.log('result', result);
      alert('Info after Uploading Image:' + result.message);
      //setIsLoading(false);
      //gotoOrderScreen();
    } catch (error) {
      console.log('error upload', error);
    }

    //gotoOrderScreen();
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{filePath.uri}</Text>

      <Button title="Open Gallery" onPress={() => chooseFile('photo')}></Button>
      <Button
        title="UPLOAD"
        onPress={() => uploadImageAndStringForAddNewOrder(imageRef)}></Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#2c3e50',
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

//make this component available to the app
export default App;
