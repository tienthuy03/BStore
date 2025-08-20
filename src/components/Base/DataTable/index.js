import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Color } from '../../../colors/colortv';

const DataTable = ({
  data = [],
  columns = [],
  emptyMessage = 'Không có dữ liệu',
  containerStyle,
  headerStyle,
  rowStyle,
  cellStyle,
  showHorizontalScroll = true,
  minTableWidth = 600,
  cellWidth = 120,
  formatCurrency,
}) => {
  // Hàm format tiền tệ mặc định
  const defaultFormatCurrency = (value) => {
    if (!value) return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatValue = (value, column) => {
    if (column.type === 'currency') {
      return (formatCurrency || defaultFormatCurrency)(value);
    }
    return value || '-';
  };

  const renderTable = () => (
    <View style={[styles.tableContainer, { minWidth: minTableWidth }, containerStyle]}>
      {/* Table Header */}
      <View style={[styles.tableHeader, headerStyle]}>
        {columns.map((column, index) => (
          <Text
            key={index}
            style={[
              styles.headerCell,
              { width: column.width || cellWidth },
              column.headerStyle
            ]}
          >
            {column.title}
          </Text>
        ))}
      </View>

      {/* Table Rows */}
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.tableRow, rowStyle]}>
          {columns.map((column, colIndex) => (
            <Text
              key={colIndex}
              style={[
                styles.tableCell,
                { width: column.width || cellWidth },
                column.cellStyle,
                cellStyle
              ]}
            >
              {formatValue(row[column.key], column)}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );

  if (data.length === 0) {
    return (
      <View style={styles.emptyTable}>
        <Text style={styles.emptyTableText}>{emptyMessage}</Text>
      </View>
    );
  }

  if (showHorizontalScroll) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tableScrollContainer}
      >
        {renderTable()}
      </ScrollView>
    );
  }

  return renderTable();
};

const styles = StyleSheet.create({
  tableScrollContainer: {
    marginTop: 8,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Color.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableCell: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  emptyTable: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  emptyTableText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default DataTable;
