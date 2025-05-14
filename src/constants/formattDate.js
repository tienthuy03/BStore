export const formatDate = (dateString) => {
    const date = new Date(dateString); // Chuyển chuỗi thành đối tượng Date
    const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và đảm bảo 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng, thêm 1 vì tháng bắt đầu từ 0
    const year = date.getFullYear(); // Lấy năm
    const hours = String(date.getHours()).padStart(2, '0'); // Lấy giờ và đảm bảo 2 chữ số
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Lấy phút và đảm bảo 2 chữ số
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Lấy giây và đảm bảo 2 chữ số

    // Trả về chuỗi với định dạng ngày/tháng/năm:giờ:phút:giây
    // return `${day}-${month}-${year}:${hours}:${minutes}:${seconds}`;
    return `${hours}:${minutes}${'  '}${day}-${month}-${year}`;
}

