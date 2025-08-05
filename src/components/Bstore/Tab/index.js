import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import * as AMT from "react-native-animatable";
import { Color } from "../../../colors/colortv";

const BSTab = ({
  scrollEnabled = true,
  fullTab = false,
  onChangeTab = null,
  tab = 0,
  ...props
}) => {
  const flatlistRef = useRef();
  const { data } = props;

  const screenWidth = Dimensions.get("window").width;
  const containerPadding = 20; // marginHorizontal
  const availableWidth = screenWidth - containerPadding;
  const tabWidth = fullTab ? availableWidth / data.length : 'auto';

  //customize tab
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    setCurrentTab(tab);
    onChangeTab && onChangeTab(tab);
  }, [tab]);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          // marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: "white",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        }}
      >
        <FlatList
          ref={flatlistRef}
          scrollEnabled={scrollEnabled}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => {
            const onlyKey = index.toString() + "tabs" + Math.random();
            return onlyKey;
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={"tab" + Math.random()}
              activeOpacity={0.7}
              style={{
                width: tabWidth,
                flex: fullTab ? 1 : 0,
                paddingHorizontal: 16,
                paddingVertical: 12,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                minWidth: 120,
                borderBottomColor:
                  item.id === currentTab
                    ? item.bottomColor != null
                      ? item.bottomColor
                      : Color.tabUnderLine
                    : "#ccc",
                borderBottomWidth: 3,
              }}
              onPress={() => {
                let index = 0;
                if (item.id === 0 || item.id === data.length - 1) {
                  index = item.id;
                } else {
                  index = item.id - 1;
                }
                flatlistRef.current.scrollToIndex({ index });
                setCurrentTab(item.id);
                onChangeTab && onChangeTab(item.id);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: item.id === currentTab ? "bold" : "normal",
                    color: item.id === currentTab ? Color.mainColor : "#7F8C8D",
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
              {item.count != null ? (
                <View
                  style={{
                    minWidth: 20,
                    minHeight: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                  }}
                >
                  <Text
                    style={{
                      color:
                        item.id == "0"
                          ? "#FFA800"
                          : item.id == "1"
                            ? "#009E00"
                            : item.id == "2"
                              ? "red"
                              : item.id == "3"
                                ? "#800080"
                                : item.id == "4"
                                  ? "#009E00"
                                  : item.id == "5"
                                    ? "red"
                                    : "#CACFD2",
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    {item.count}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        />
      </View>
      <Effect key={data[currentTab].id}>
        {data[currentTab] ? data[currentTab].screen : null}
      </Effect>
    </View>
  );
};
const Effect = ({ children }) => {
  return (
    <AMT.View style={{ flex: 1 }} animation={"fadeInRight"} duration={300}>
      {children}
    </AMT.View>
  );
};
export default BSTab;
