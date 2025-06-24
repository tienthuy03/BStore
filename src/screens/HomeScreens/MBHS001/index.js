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

const categories = [
  {
    code: 6,
    prod_type_nm: "Cua biển",
    icon: "🦀",
  },
  {
    code: 5,
    prod_type_nm: "Cá biển",
    icon: "🐟",
  },
  {
    code: 6,
    prod_type_nm: "Cua biển",
    icon: "🦀",
  },
  {
    code: 5,
    prod_type_nm: "Cá biển",
    icon: "🐟",
  },
  {
    code: 6,
    prod_type_nm: "别让爱凋落 | Lư Nhuận Trạch",
    icon: "🦀",
  },
  {
    code: 5,
    prod_type_nm: "Cá biển hải minh",
    icon: "🐟",
  }
]

const products = [
  {
    "prod_id": "SP001",
    "unit_price": "200000",
    "price": "200,000",
    "prod_nm": "Cua biển Cà Mau",
    "short_nm": "Cua biển",
    "uom": "KG",
    "use_yn": "N",
    "old_price": "220000",
    "save_off": "9",
    "description": "Cua biển tươi sống, thịt chắc, giao hàng trong ngày",
    "qty": 50,
    "image_uri": "pk=10247&table_nm=tc_fsbinary&column_nm=data",
  },
  {
    "prod_id": "SP002",
    "unit_price": "150000",
    "price": "150,000",
    "prod_nm": "Tôm sú Bạc Liêu",
    "short_nm": "Tôm sú",
    "uom": "KG",
    "use_yn": "Y",
    "old_price": "170000",
    "save_off": "12",
    "description": "Tôm sú loại 20 con/kg, còn sống",
    "qty": 80,
    "image_uri": "pk=10247&table_nm=tc_fsbinary&column_nm=data",
  },
  {
    "prod_id": "SP003",
    "unit_price": "120000",
    "price": "120,000",
    "prod_nm": "Mực ống Phú Quốc",
    "short_nm": "Mực ống",
    "uom": "KG",
    "use_yn": "Y",
    "old_price": "135000",
    "save_off": "11",
    "description": "Mực ống câu, loại vừa, thịt ngọt",
    "qty": 70,
    "image_uri": "pk=10247&table_nm=tc_fsbinary&column_nm=data",
  },
  {
    "prod_id": "SP004",
    "unit_price": "90000",
    "price": "90,000",
    "prod_nm": "Cá nục tươi",
    "short_nm": "Cá nục",
    "uom": "KG",
    "use_yn": "N",
    "old_price": "100000",
    "save_off": "10",
    "description": "Cá nục đánh bắt trong ngày, sơ chế sạch",
    "qty": 100,
    "image_uri": "pk=10247&table_nm=tc_fsbinary&column_nm=data",
  },
  {
    "prod_id": "SP005",
    "unit_price": "300000",
    "price": "300,000",
    "prod_nm": "Ghẹ xanh loại 1",
    "short_nm": "Ghẹ xanh",
    "uom": "KG",
    "use_yn": "N",
    "old_price": "350000",
    "save_off": "14",
    "description": "Ghẹ xanh Cà Mau loại 4-5 con/kg, rất chắc thịt",
    "qty": 30,
    "image_uri": "pk=10247&table_nm=tc_fsbinary&column_nm=data",
  }
];


const Menu_Production = ({ navigation }) => {
  const router = useRoute()
  const { tco_depot_pk } = router.params

  const [selectedProduct, setSelectedProduct] = useState(categories)
  const [listCategories, setListCategories] = useState([])
  const [listProducts, setListProducts] = useState([])
  const [listDetailProduct, setListDetailProduct] = useState([])
  const [listPaymentMethod, setListPaymentMethod] = useState([])
  const [listArea, setListArea] = useState([])

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
            categories={categories}
            onPress={(category) => {
              console.log("Danh mục được chọn:", category)
            }}
          />
        )
      case "products":
        return (
          <Products_Card
            products={products}
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
    const in_par = {
      p1_varchar2: userPk,
      p2_varchar2: tco_depot_pk,
      p3_varchar2: APP_VERSION,
      p4_varchar2: crt_by,
    }
    const out_par = {
      p1_sys: "list_categories",
      p2_sys: "list_products",
      p3_sys: "list_payment_method",
      p4_sys: "list_area",
    }
    console.log("in_par STV_HR_SEL_MBI_HRDP00100_0: ", in_par);

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
          && rs.data.list_payment_method && rs.data.list_area
        ) {
          console.log("Response data:", rs.data.list_categories)
          setListCategories(rs.data.list_categories)
          setListProducts(rs.data.list_products)
          setListPaymentMethod(rs.data.list_payment_method)
          setListArea(rs.data.list_area)
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