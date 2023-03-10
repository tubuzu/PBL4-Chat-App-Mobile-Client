import {
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import ImageView from "react-native-image-viewing";
import { MessageAttachment } from "../../utils/types";

type Props = {
  attachments: MessageAttachment[];
  onContextMenu: any;
};

const ImageAttachments = ({ attachments, onContextMenu }: Props) => {
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  // let imageIndex = 0;
  const handleSelectImage = (index: number) => {
    setImageIndex(index);
    setImageViewerVisible(true);
  };

  return (
    <>
      {attachments.map((attachment, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onLongPress={() => {
            onContextMenu();
          }}
          delayLongPress={400}
          onPress={() => handleSelectImage(index)}
          key={index}
          style={[
            styles.imageContainer,
            attachments.length === 1 && { flex: 1 },
          ]}
        >
          <Image source={{ uri: attachment.url }} style={styles.image} />
        </TouchableOpacity>
      ))}

      <ImageView
        images={attachments.map(({ url }, index) => ({ key: index, uri: url }))}
        imageIndex={imageIndex}
        visible={imageViewerVisible}
        onRequestClose={() => setImageViewerVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "50%",
    aspectRatio: 1,
    // paddingVertical: 3,
  },
  image: {
    flex: 1,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ImageAttachments;
