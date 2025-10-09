# DataTable Component

Component table có thể tái sử dụng với khả năng scroll ngang và tùy chỉnh linh hoạt.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | `[]` | Dữ liệu hiển thị trong table |
| `columns` | Array | `[]` | Cấu hình các cột |
| `emptyMessage` | String | `'Không có dữ liệu'` | Thông báo khi không có dữ liệu |
| `containerStyle` | Object | - | Style cho container table |
| `headerStyle` | Object | - | Style cho header |
| `rowStyle` | Object | - | Style cho từng dòng |
| `cellStyle` | Object | - | Style cho từng ô |
| `showHorizontalScroll` | Boolean | `true` | Có hiển thị scroll ngang không |
| `minTableWidth` | Number | `600` | Độ rộng tối thiểu của table |
| `cellWidth` | Number | `120` | Độ rộng mặc định cho mỗi cột |
| `formatCurrency` | Function | - | Hàm format tiền tệ tùy chỉnh |

## Cấu hình Columns

Mỗi column object có thể có các thuộc tính:

```javascript
{
  key: 'fieldName',           // Key trong data object
  title: 'Tên cột',          // Tiêu đề cột
  width: 120,                // Độ rộng cột (optional)
  type: 'currency',          // Loại dữ liệu (optional: 'currency')
  cellStyle: {},             // Style cho ô trong cột (optional)
  headerStyle: {}            // Style cho header cột (optional)
}
```

## Ví dụ sử dụng

### Cơ bản
```javascript
import DataTable from '../../../components/Base/DataTable';

const columns = [
  { key: 'name', title: 'Tên', width: 150 },
  { key: 'age', title: 'Tuổi', width: 80 },
  { key: 'email', title: 'Email', width: 200 }
];

const data = [
  { name: 'Nguyễn Văn A', age: 25, email: 'a@example.com' },
  { name: 'Trần Thị B', age: 30, email: 'b@example.com' }
];

<DataTable 
  data={data} 
  columns={columns} 
/>
```

### Với tiền tệ
```javascript
const columns = [
  { key: 'product', title: 'Sản phẩm', width: 150 },
  { 
    key: 'price', 
    title: 'Giá', 
    width: 120, 
    type: 'currency',
    cellStyle: { color: '#007AFF', fontWeight: 'bold' }
  }
];

const data = [
  { product: 'iPhone', price: 25000000 },
  { product: 'Samsung', price: 15000000 }
];

<DataTable 
  data={data} 
  columns={columns}
  formatCurrency={(value) => `${value.toLocaleString()} VNĐ`}
/>
```

### Tùy chỉnh style
```javascript
<DataTable 
  data={data} 
  columns={columns}
  containerStyle={{ marginTop: 10 }}
  headerStyle={{ backgroundColor: '#FF6B6B' }}
  rowStyle={{ backgroundColor: '#F8F9FA' }}
  cellStyle={{ fontSize: 14 }}
  showHorizontalScroll={false}
  minTableWidth={800}
  cellWidth={150}
/>
```

## Tính năng

- ✅ Scroll ngang tự động
- ✅ Tùy chỉnh style linh hoạt
- ✅ Hỗ trợ format tiền tệ
- ✅ Responsive design
- ✅ Empty state
- ✅ Tái sử dụng toàn bộ ứng dụng
