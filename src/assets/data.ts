const problemIndustries = [
  {
    label: "Tài chính",
    value: "Tài chính",
  },
  {
    label: "Hành chính",
    value: "Hành chính",
  },
  {
    label: "Dược",
    value: "Dược",
  },
  {
    label: "Vật tư",
    value: "Vật tư",
  },
  {
    label: "Cận lâm sàng",
    value: "Cận lâm sàng",
  },
  {
    label: "Phần cứng",
    value: "Phần cứng",
  },
  {
    label: "Phần mềm",
    value: "Phần mềm",
  },
  {
    label: "Máy tính",
    value: "Máy tính",
  },
  {
    label: "Máy in",
    value: "Máy in",
  },

];

const prinfs = [
  {
    label: "Canon 2900",
    value: "Canon 2900",
  },
  {
    label: "HP LaserJet Pro M404dw",
    value: "HP LaserJet Pro M404dw",
  }

];

const problemRole = [
  {
    label: "Nhân viên",
    value: "Nhân viên",
  },
  {
    label: "Bác sĩ",
    value: "Bác sĩ",
  },
  {
    label: "Điều dưỡng",
    value: "Điều dưỡng",
  },
];

const meeting = [
  {
    label: "Hội trường A",
    value: "Hội trường A",
  },
  {
    label: "Hội trường B",
    value: "Hội trường B",
  },
  {
    label: "Phòng Họp BGĐ",
    value: "Phòng Họp BGĐ",
  },
  {
    label: "Văn phòng PIC",
    value: "Văn phòng PIC",
  },
  {
    label: "Phòng Huấn Luyện 1",
    value: "Phòng Huấn Luyện 1",
  },
  {
    label: "Hội trường lầu 6",
    value: "Hội trường lầu 6",
  },
  {
    label: "Phòng Tiếp khách BGĐ",
    value: "Phòng Tiếp khách BGĐ",
  },
  {
    label: "Phòng Huấn luyện 2-3",
    value: "Phòng Huấn luyện 2-3",
  },
  {
    label: "Thư Viện",
    value: "Thư Viện",
  },
  {
    label: "Khoa xét nghiệm huyết học",
    value: "Khoa xét nghiệm huyết học",
  },
  {
    label: "Khoa Sinh hóa",
    value: "Khoa Sinh hóa",
  },
  {
    label: "Khoa Vi sinh",
    value: "Khoa Vi sinh",
  },
  {
    label: "Khoa Giải phẫu bệnh",
    value: "Khoa Giải phẫu bệnh",
  },
  {
    label: "Khoa Chẩn đoán hình ảnh",
    value: "Khoa Chẩn đoán hình ảnh",
  },
  {
    label: "Khoa chống nhiễm khuẩn",
    value: "Khoa chống nhiễm khuẩn",
  },
  {
    label: "Khoa dược",
    value: "Khoa dược",
  },
  {
    label: "Phòng Tổ chức cán bộ",
    value: "Phòng Tổ chức cán bộ",
  },
  {
    label: "Phòng Tài chính kế toán",
    value: "Phòng Tài chính kế toán",
  },
  {
    label: "Phòng Chỉ đạo tuyến",
    value: "Phòng Chỉ đạo tuyến",
  },
  {
    label: "Phòng Công tác xã hội",
    value: "Phòng Công tác xã hội",
  },
  {
    label: "Hành chính quản trị",
    value: "Hành chính quản trị",
  },
  {
    label: "Phòng Điều dưỡng",
    value: "Phòng Điều dưỡng",
  },
  {
    label: "Phòng Công nghệ thông tin",
    value: "Phòng Công nghệ thông tin",
  },
  {
    label: "Phòng Quản lý chất lượng",
    value: "Phòng Quản lý chất lượng",
  },
  {
    label: "Phòng Kế hoạch tổng hợp",
    value: "Phòng Kế hoạch tổng hợp",
  },
  {
    label: "Phòng Vật tư thiết bị Y tế",
    value: "Phòng Vật tư thiết bị Y tế",
  },
  {
    label: "Khoa khám bệnh",
    value: "Khoa khám bệnh",
  },
  {
    label: "Khoa sức khỏe trẻ em – phòng khám chất lượng cao",
    value: "Khoa sức khỏe trẻ em – phòng khám chất lượng cao",
  },
  {
    label: "Khoa tâm lý -vật lý trị liệu",
    value: "Khoa tâm lý -vật lý trị liệu",
  },
  {
    label: "Khoa dinh dưỡng",
    value: "Khoa dinh dưỡng",
  },
  {
    label: "Khoa phẫu thuật gây mê hồi sức",
    value: "Khoa phẫu thuật gây mê hồi sức",
  },
  {
    label: "Khoa thận niệu",
    value: "Khoa thận niệu",
  },
  {
    label: "Khoa bỏng – chỉnh trực",
    value: "Khoa bỏng – chỉnh trực",
  },
  {
    label: "Khoa Ngoại Tổng hợp",
    value: "Khoa Ngoại Tổng hợp",
  },
  {
    label: "Khoa ngoại thần kinh",
    value: "Khoa ngoại thần kinh",
  },
  {
    label: "Khoa phẫu thuật trong ngày",
    value: "Khoa phẫu thuật trong ngày",
  },
  {
    label: "Khoa Gan – Mật – Tụy và ghép gan",
    value: "Khoa Gan – Mật – Tụy và ghép gan",
  },
  {
    label: "Khoa liên chuyên khoa",
    value: "Khoa liên chuyên khoa",
  },
  {
    label: "Khoa sơ sinh",
    value: "Khoa sơ sinh",
  },
  {
    label: "Khoa Hô hấp 1",
    value: "Khoa Hô hấp 1",
  },
  {
    label: "Khoa tiêu hóa",
    value: "Khoa tiêu hóa",
  },
  {
    label: "Khoa Hô hấp 2",
    value: "Khoa Hô hấp 2",
  },
  {
    label: "Khoa nội tổng hợp",
    value: "Khoa nội tổng hợp",
  },
  {
    label: "Khoa Tim mạch",
    value: "Khoa Tim mạch",
  },
  {
    label: "Khoa Nội thần kinh",
    value: "Khoa Nội thần kinh",
  },
  {
    label: "Khoa Nội 1",
    value: "Khoa Nội 1",
  },
  {
    label: "Khoa Nội 2",
    value: "Khoa Nội 2",
  },
  {
    label: "Khoa Nội 3",
    value: "Khoa Nội 3",
  },
  {
    label: "Khoa Thận nội tiết",
    value: "Khoa Thận nội tiết",
  },
  {
    label: "Khoa nhiễm",
    value: "Khoa nhiễm",
  },
  {
    label: "Khoa Covid-19",
    value: "Khoa Covid-19",
  },
  {
    label: "Ung bướu huyết học",
    value: "Ung bướu huyết học",
  },
  {
    label: "Khoa Điều trị ban ngày",
    value: "Khoa Điều trị ban ngày",
  },
  {
    label: "Khoa hồi sức tích cực",
    value: "Khoa hồi sức tích cực",
  },
  {
    label: "Khoa Cấp cứu",
    value: "Khoa Cấp cứu",
  },
  {
    label: "Khoa Hồi sức sơ sinh",
    value: "Khoa Hồi sức sơ sinh",
  },
  {
    label: "Khoa Hồi sức nhiễm – Covid -19",
    value: "Khoa Hồi sức nhiễm – Covid -19",
  },
  {
    label: "Phòng họp 1 Hội trường lầu 6",
    value: "Phòng họp 1 Hội trường lầu 6",
  },
  {
    label: "Phòng họp 2 Hội trường lầu 6",
    value: "Phòng họp 2 Hội trường lầu 6",
  },
  {
    label: "Ban chỉ huy công trình",
    value: "Ban chỉ huy công trình",
  },
  {
    label: "Trực tuyến qua Zoom QLCL ID:9664419981 Pass:438",
    value: "Trực tuyến qua Zoom QLCL ID:9664419981 Pass:438",
  },
  {
    label: "Khoa Lâm sàng",
    value: "Khoa Lâm sàng",
  },
  {
    label: "HTB, P.HL2-3",
    value: "HTB, P.HL2-3",
  },
  {
    label: "Khoa Covid-19",
    value: "Khoa Covid-19",
  },
  {
    label: "Sau Giao Ban",
    value: "Sau Giao Ban",
  },
  {
    label: "Phòng Tiếp Công Dân",
    value: "Phòng Tiếp Công Dân",
  },
  {
    label: "Phòng Họp tại các khoa",
    value: "Phòng Họp tại các khoa",
  },
  {
    label: "Trực tuyến qua Zoom Giao Ban BV ID:5262728292 Pass:123",
    value: "Trực tuyến qua Zoom Giao Ban BV ID:5262728292 Pass:123",
  },
  {
    label: "Tại Sở",
    value: "Tại Sở",
  },
  {
    label: "Trực tuyến qua Zoom KHTH ID:9914331433 Pass:278",
    value: "Trực tuyến qua Zoom KHTH ID:9914331433 Pass:278",
  },
  {
    label: "Khoa Tim mạch lồng ngực",
    value: "Khoa Tim mạch lồng ngực",
  },
  {
    label: "Phòng khám OPC",
    value: "Phòng khám OPC",
  },
  {
    label: "Căn nhà số 14/2F",
    value: "Căn nhà số 14/2F",
  },
];

const problemReciever = [
  {
    label: "Ngô Quang Quyền",
    value: "Ngô Quang Quyền",
  },
  {
    label: "Nguyễn Trường Giang",
    value: "Nguyễn Trường Giang",
  },
  {
    label: "Nguyễn Minh Thi",
    value: "Nguyễn Minh Thi",
  },
  {
    label: "Cao Đức Tài",
    value: "Cao Đức Tài",
  },
  {
    label: "Huỳnh Thanh Tùng",
    value: "Huỳnh Thanh Tùng",
  },
  {
    label: "Trần Trọng Phương Trừ",
    value: "Trần Trọng Phương Trừ",
  },
  {
    label: "Nguyễn Đình Trí",
    value: "Nguyễn Đình Trí",
  },
  {
    label: "Lê Phú Quí",
    value: "Lê Phú Quí",
  },
  {
    label: "Trần Anh Kiệt",
    value: "Trần Anh Kiệt",
  },
  {
    label: "Trần Mặc Khải",
    value: "Trần Mặc Khải",
  },
  {
    label: "Phạm Minh Hiếu",
    value: "Phạm Minh Hiếu",
  },
];

export { problemIndustries, problemRole, problemReciever, prinfs, meeting };
