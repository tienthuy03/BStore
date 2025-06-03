import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from '../../../colors/colortv';
import Categories_Card from '../../../components/Bstore/Categories_Card';
import Products_Card from '../../../components/Bstore/Products_Card';
import SearchBar from '../../../components/Bstore/SearchBar';
import Modal_Product from '../../../components/Bstore/ProductDetailModal';
import ProductDetailModal from '../../../components/Bstore/ProductDetailModal';
import sysFetch from '../../../services/fetch_crypt';
import { useRoute } from '@react-navigation/native';
import { APP_VERSION } from '../../../config/Pro';
import { useSelector } from 'react-redux';
import Header from '../../../components/Bstore/Header/Header';

const Menu_Production = ({ navigation: { goBack } }) => {
  const router = useRoute();
  const { tco_depot_pk } = router.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [listCategories, setListCategories] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [listDetailPriduct, setListDetailProduct] = useState([]);
  const [listCategoryProduct, setListCategoryProduct] = useState([]);

  const Api = useSelector((state) => state.SysConfigReducer.API_URL);

  let tokenLogin = useSelector(
    (state) => state.loginReducers.data.data.tokenLogin
  );
  let userPk = useSelector(
    (state) => state.loginReducers.data.data.tes_user_pk
  );
  let crt_by = useSelector((state) => state.loginReducers.data.data.crt_by);

  // const openModal = (product) => {
  //   console.log('Sản phẩm được chọn:', product);
  //   setSelectedProduct(product);
  //   setModalVisible(true);
  // };

  const openModal = (product) => {
    console.log('Sản phẩm được chọn:', product);
    setSelectedProduct(product);
    getDetailProduct(product.product_pk); // gọi API lấy chi tiết
    setModalVisible(true);
  };


  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  // Sections cho FlatList chính
  const sections = [
    { id: 'categories', type: 'categories' },
    { id: 'products', type: 'products' }
  ];

  // Render function cho FlatList chính
  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'categories':
        return <Categories_Card categories={listCategories} onPress={(category) => {
          console.log("Danh mục được chọn:", category);
        }} />;
      case 'products':
        return <Products_Card
          products={listProducts}
          onPress={(product) => openModal(product)} // nhận sản phẩm khi nhấn
        />

      default:
        return null;
    }
  };
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
      tokenLogin
    )
      .then((rs) => {
        if (rs && rs.data.list_categories && rs.data.list_products) {
          console.log("Response data:", rs.data.list_categories);

          // Cập nhật state hoặc xử lý dữ liệu ở đây
          setListCategories(rs.data.list_categories);
          setListProducts(rs.data.list_products);
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDetailProduct = (product_pk) => {
    sysFetch(
      Api,
      {
        pro: "STV_HR_SEL_MBI_HRDP00100_1",
        in_par: {
          p1_varchar2: userPk,
          p2_varchar2: 'SP001',
          p3_varchar2: APP_VERSION,
          p4_varchar2: crt_by,
        },
        out_par: {
          p1_sys: "list_detail_product",
          p2_sys: "list_category_product",
        },
      },
      tokenLogin
    )
      .then((rs) => {
        console.log("Response data:", rs.data);
        // if (rs && rs.data.list_detail_product && rs.data.list_category_product) {


        //   // Cập nhật state hoặc xử lý dữ liệu ở đây
        //   setListDetailProduct(rs.data.list_detail_product);
        //   setListCategoryProduct(rs.data.list_category_product);
        // } else {
        //   console.log("No data found");
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getListProduct();
  }, []);


  return (
    <View style={styles.container}>
      <Header goBack={goBack} >
        Danh mục sản phẩm
      </Header>
      <View style={{ paddingTop: 8 }}>
        <SearchBar />
      </View>

      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent} />

      <ProductDetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    alignItems: 'center',
    borderRadius: 8,
  },

  storeInfoHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfoDetail: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContent: {
    marginTop: 16,
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerTopRow: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: StatusBar.currentHeight || 0,
  },

});

export default Menu_Production;