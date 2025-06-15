"use client"

import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Color } from "../../../colors/colortv"
import Categories_Card from "../../../components/Bstore/Categories_Card"
import Products_Card from "../../../components/Bstore/Products_Card"
import SearchBar from "../../../components/Bstore/SearchBar"
import ProductDetailModal from "../../../components/Bstore/ProductDetailModal"
import sysFetch from "../../../services/fetch_crypt"
import { useRoute } from "@react-navigation/native"
import { APP_VERSION } from "../../../config/Pro"
import { useSelector } from "react-redux"
import Header from "../../../components/Bstore/Header/Header"

const Menu_Production = ({ navigation }) => {
  const router = useRoute()
  const { tco_depot_pk } = router.params

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [listCategories, setListCategories] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [listDetailProduct, setListDetailProduct] = useState([])
  const [listCategoryProduct, setListCategoryProduct] = useState([])

  const Api = useSelector((state) => state.SysConfigReducer.API_URL)
  const tokenLogin = useSelector((state) => state.loginReducers.data.data.tokenLogin)
  const userPk = useSelector((state) => state.loginReducers.data.data.tes_user_pk)
  const crt_by = useSelector((state) => state.loginReducers.data.data.crt_by)

  // Fixed openModal function to receive product parameter
  const openModal = (product) => {
    console.log('Sản phẩm được chọn:', product);
    setSelectedProduct(product);
    // Pass the product ID to getDetailProduct
    getDetailProduct(product.tdp_production_pk);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false)
    setSelectedProduct(null)
    // Clear detail product data when closing modal
    setListDetailProduct([])
    setListCategoryProduct([])
  }

  // Sections cho FlatList chính
  const sections = [
    { id: "categories", type: "categories" },
    { id: "products", type: "products" },
  ]

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
            onPress={(product) => {
              navigation.navigate('DetailProduct',
                {
                  tdp_production_pk: product.tdp_production_pk,
                  prod_nm: product.prod_nm,
                  prod_price: product.price,
                  prod_desc: product.description,
                  prod_uom: product.uom,
                  prod_unit_price: product.unit_price,
                  tco_depot_pk: product.tco_depot_pk

                });
            }}
          />
        )
      default:
        return null
    }
  }
  console.log(listProducts);

  const getListProduct = () => {
    sysFetch(
      Api,
      {
        pro: "STV_HR_SEL_MBI_HRDP00100_0",
        in_par: {
          p1_varchar2: userPk,
          p2_varchar2: tco_depot_pk,
          p3_varchar2: APP_VERSION,
          p4_varchar2: crt_by,
        },
        out_par: {
          p1_sys: "list_categories",
          p2_sys: "list_products",
        },
      },
      tokenLogin,
    )
      .then((rs) => {
        if (rs && rs.data.list_categories && rs.data.list_products) {
          console.log("Response data:", rs.data.list_categories)
          setListCategories(rs.data.list_categories)
          setListProducts(rs.data.list_products)
        } else {
          console.log("No data found")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getDetailProduct = (product_pk) => {
    // Add validation to ensure product_pk exists
    if (!product_pk) {
      console.log("Product PK is missing");
      return;
    }

    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: product_pk,
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    }
    console.log("Getting product details for:", in_par);

    sysFetch(
      Api,
      {
        pro: "STV_HR_SEL_MBI_HRDP00100_1",
        in_par: in_par,
        out_par: {
          p1_sys: "list_detail_product",
          p2_sys: "list_category_product",
        },
      },
      tokenLogin,
    )
      .then((rs) => {
        console.log("Product detail response:", rs.data)
        if (rs && rs.data) {
          setListDetailProduct(rs.data.list_detail_product || [])
          setListCategoryProduct(rs.data.list_category_product || [])
        }
      })
      .catch((error) => {
        console.log("Error getting product details:", error)
      })
  }

  useEffect(() => {
    getListProduct()
  }, [])

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