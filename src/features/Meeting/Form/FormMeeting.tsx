import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  message,
  Upload,
  DatePicker,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isNil, map } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { meeting } from "../../../assets/data";
import { ROLE } from "../../../constants/role";
import { adminUserApi } from "../../../services/apis/adminUser";
import { authApi } from "../../../services/apis/authApi";
import { departmentApi } from "../../../services/apis/departmentApi";
import { meetApi } from "../../../services/apis/meet";
import { MeetDto } from "../../../types/meet";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const { Option } = Select;

const FormMeeting = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => authApi.getProfile(),
  });

  const { data: adminUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => adminUserApi.getAllNoPagination(),
    enabled: user?.data?.role === ROLE.SUPER_ADMIN,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => departmentApi.getAllNoPagination(),
    enabled: user?.data?.role === ROLE.SUPER_ADMIN,
  });

  const { data: meet } = useQuery({
    queryKey: ["meet", id],
    queryFn: () => meetApi.getById(id as string),
    enabled: !isNil(id),
  });

  const createMeetMutation = useMutation({
    mutationFn: (values: MeetDto) => {
      return meetApi.create(values);
    },
  });

  const updateMeet = useMutation({
    mutationFn: (values: MeetDto) => {
      return meetApi.update(id as string, values);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [startTime, endTime] = useMemo(() => {
    if (meet?.data?.startTime && meet?.data?.endTime) {
      return [
        dayjs(meet.data.startTime),
        dayjs(meet.data.endTime)
      ];
    } else {
      return [null, null];
    }
  }, [meet?.data?.startTime, meet?.data?.endTime]);
  
  const initialValues = {
    title: meet?.data?.title ?? "",
    rangePicker: [startTime, endTime],
    host: meet?.data?.host ?? "",
    room: meet?.data?.room ?? "",
    adminUserId: meet?.data?.adminUserId ?? "",
    departmentId: meet?.data?.departmentId ?? "",
    participants: meet?.data?.participants ?? "",
  };

  const handleFinish = useCallback(
    (values: any) => {
      // Sử dụng giá trị startTime và endTime từ state
      const rangePickerValue = values.rangePicker;

      const startTime = rangePickerValue[0];
      const endTime = rangePickerValue[1];

      const formData = {
        title: values.title,
        startTime: startTime,
        endTime: endTime,
        host: values.host,
        room: values.room,
        adminUserId: values.adminUserId ?? user?.data?.id,
        departmentId: values.departmentId ?? user?.data?.departmentId,
        participants: values.participants,
      };

      if (id) {
        updateMeet.mutate(formData, {
          onSuccess: () => {
            message.success("Cập nhật phiếu thành công");
            navigate("/meeting-schedule");
          },
          onError: () => {
            message.error("Cập nhật phiếu thất bại");
          },
        });
      } else {
        createMeetMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Tạo lịch họp thành công");
            navigate("/meeting-schedule");
          },
          onError: (error: any) => {
            const { data } = error;
            if (data?.response?.data?.statusCode === 401) {
              message.error("Lỗi rồi");
            }
          },
        });
      }
    },
    [id, user?.data?.id]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // const handleChange = (info) => {
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //     // Ở đây bạn có thể gửi tệp PDF lên máy chủ hoặc xử lý theo nhu cầu của bạn
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  const checkRoleAdmin = useMemo(() => {
    if (user?.data?.role === ROLE.SUPER_ADMIN) {
      return true;
    }
    return false;
  }, [user?.data?.role]);
  console.log(
    "🚀 ~ file: FormProblem.tsx:125 ~ checkRoleAdmin ~ checkRoleAdmin:",
    checkRoleAdmin
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <section>
      <h1 style={{ padding: "15px 0", letterSpacing: "1px" }}>
        {id ? "Cập nhật" : "Tạo"} lịch họp
      </h1>

      <Form
        form={form}
        name="problem"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onFinish={handleFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col xl={12}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                { required: true, message: "Vui lòng nhập tiêu đề phòng họp" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label="Phòng họp" name="room">
              <Select
                showSearch
                placeholder="Chọn phòng"
                options={
                  map(meeting, (meeting) => {
                    return {
                      label: meeting.label,
                      value: meeting.value,
                    };
                  }) ?? []
                }
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label="Chủ trì" name="host">
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label="Người tham gia" name="participants">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          {user?.data.role === ROLE.SUPER_ADMIN && (
            <Col xl={12}>
              <Form.Item
                label="Nhân viên"
                name="adminUserId"
                rules={[{ required: true, message: "Vui lòng chọn nhân viên" }]}
              >
                <Select
                  placeholder="Chọn nhân viên"
                  options={
                    map(adminUsers?.data, (adminUser) => {
                      return {
                        label: adminUser.fullName,
                        value: adminUser.id,
                      };
                    }) ?? []
                  }
                />
              </Form.Item>
            </Col>
          )}
          {user?.data.role === ROLE.SUPER_ADMIN && (
            <Col xl={12}>
              <Form.Item
                label="Khoa"
                name="departmentId"
                rules={[{ required: true, message: "Vui lòng chọn khoa" }]}
              >
                <Select
                  placeholder="Chọn nhân viên"
                  options={
                    map(departments?.data, (department) => {
                      return {
                        label: department.name,
                        value: department.id,
                      };
                    }) ?? []
                  }
                />
              </Form.Item>
            </Col>
          )}
          <Col xl={12}>
            <Form.Item
              label="Thời gian bắt đầu - kết thúc"
              name={["rangePicker"]}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          </Col>
          <Col xl={12}>
            {" "}
            <Form.Item label="Tệp PDF" name="pdfFile">
              <Upload
                name="pdfFile"
                action="/api/uploadPdf" // Thay đổi đường dẫn tương ứng với URL của máy chủ để xử lý yêu cầu tải lên
                accept=".pdf" // Chỉ cho phép tải lên các tệp có phần mở rộng là .pdf
              >
                <Button icon={<UploadOutlined />}>Tải lên tệp PDF</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          {id ? (
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          )}
        </Form.Item>
      </Form>
    </section>
  );
};

export default FormMeeting;
