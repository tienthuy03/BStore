import { useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, ToastAndroid, View } from "react-native"
import { useSelector } from "react-redux"
import { Color } from "../../../colors/colortv"
import Categories_Card from "../../../components/Bstore/Categories_Card"
import Header from "../../../components/Bstore/Header/Header"
import Products_Card from "../../../components/Bstore/Products_Card"
import SearchBar from "../../../components/Bstore/SearchBar"
import { APP_VERSION } from "../../../config/Pro"
import sysFetch from "../../../services/fetch_crypt"

// Sections cho FlatList chính
const sections = [
  { id: "categories", type: "categories" },
  { id: "products", type: "products" },
]

const Menu_Production = ({ navigation }) => {
  const router = useRoute()
  const { tco_depot_pk } = router.params

  const [selectedProduct, setSelectedProduct] = useState([])
  const [listCategories, setListCategories] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [listDetailProduct, setListDetailProduct] = useState([])
  const [listPaymentMethod, setListPaymentMethod] = useState([])
  const [listArea, setListArea] = useState([])

  const Api = useSelector((state) => state.SysConfigReducer.API_URL)
  const tokenLogin = useSelector((state) => state.loginReducers.data.data.tokenLogin)
  const userPk = useSelector((state) => state.loginReducers.data.data.tes_user_pk)
  const crt_by = useSelector((state) => state.loginReducers.data.data.crt_by)



  // Render function cho FlatList chính
  const renderSection = ({ item }) => {
    switch (item.type) {
      case "categories":
        return (
          <Categories_Card
            categories={listCategories}
            onPress={(category) => {
              console.log("Danh mục được chọn:", category)
            }}
          />
        )
      case "products":
        return (
          <Products_Card
            products={listProducts}
            onPress={handleProductPress}
          />
        )
      default:
        return null
    }
  }
  const getListProduct = () => {
    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: tco_depot_pk,
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    }
    const out_par = {
      p1_sys: "list_categories",
      p2_sys: "list_products",
    }
    console.log("in_par: ", in_par);

    sysFetch(
      Api,
      {
        pro: "STV_HR_SEL_MBI_HRDP00100_0",
        in_par: in_par,
        out_par: out_par
      },
      tokenLogin,
    )
      .then((rs) => {
        console.log("rs lisst prod: ", rs);

        if (rs && rs.data.list_categories && rs.data.list_products
          // && rs.data.list_payment_method && rs.data.list_area
        ) {
          console.log("Response data:", rs.data.list_categories)
          setListCategories(rs.data.list_categories)
          setListProducts(rs.data.list_products)
          // setListPaymentMethod(rs.data.list_payment_method)
          // setListArea(rs.data.list_area)
          console.log("listPaymentMethod: ", rs.data.list_payment_method);
          console.log("listArea: ", rs.data.list_area);

        } else {
          console.log("No data found")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getListProduct()
  }, [])


  //handle navigation screen detail product
  const handleProductPress = (product) => {
    if (product.use_yn === "N") {
      ToastAndroid.show("Mặt hàng đã hết", ToastAndroid.SHORT)
    } else {
      navigation.navigate('DetailProduct', {
        item: product,
        // item_Payment_Method: listPaymentMethod,
        // item_Area: listArea,
      });
    }
  }
  return (
    <View style={styles.container}>
      <Header goBack={navigation.goBack}>Danh mục sản phẩm</Header>
      <View style={{ paddingTop: 8 }}>
        <SearchBar />
      </View>

      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "80%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 4,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: Color.mainColor,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  storeInfoHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  storeInfoDetail: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContent: {
    marginTop: 16,
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  headerTopRow: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

export default Menu_Production