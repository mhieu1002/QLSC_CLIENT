import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { isNil, map } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import {
  problemIndustries,
  problemReciever,
  meeting,
} from "../../../assets/data";
import { ROLE } from "../../../constants/role";
import { adminUserApi } from "../../../services/apis/adminUser";
import { authApi } from "../../../services/apis/authApi";
import { departmentApi } from "../../../services/apis/departmentApi";
import { meetApi } from "../../../services/apis/meet";
import { MeetDto } from "../../../types/meet";

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const FormMeeting = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
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

  // const updatePrinftMutation = useMutation({
  //   mutationFn: (values: PrinfDto) => {
  //     return prinfApi.update(id as string, values);
  //   },
  // });

  // const updateConfirmPrinftMutation = useMutation({
  //   mutationFn: (values: { isConfirmed: boolean }) => {
  //     return prinfApi.updateConfirm(id as string, values);
  //   },
  // });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = {
    title: meet?.data?.title ?? "",
    startTime: meet?.data?.startTime ?? "",
    endTime: meet?.data?.endTime ?? "",
    host: meet?.data?.host ?? "",
    room: meet?.data?.room ?? "",
    adminUserId: meet?.data?.adminUserId ?? "",
    departmentId: meet?.data?.departmentId ?? "",
    participants: meet?.data?.participants ?? "",
  };

  const handleFinish = useCallback(
    (values: MeetDto) => {
      // Sử dụng giá trị startTime và endTime từ state
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

      // Kiểm tra xem startTime và endTime có giá trị không
      if (!startTime || !endTime) {
        // Thông báo cho người dùng cung cấp giá trị cho startTime và endTime
        message.error("Vui lòng chọn thời gian bắt đầu và kết thúc");
        return; // Dừng hàm ở đây nếu không có giá trị cho startTime hoặc endTime
      }

      console.log("🚀 ~ FormMeeting ~ formData:", formData);

      if (id) {
        // updatePrinftMutation.mutate(formData, {
        //   onSuccess: () => {
        //     message.success("Cập nhật phiếu thành công");
        //     navigate("/sign-up-for-printer-repair");
        //   },
        //   onError: () => {
        //     message.error("Cập nhật phiếu thất bại");
        //   },
        // });
      } else {
        createMeetMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Tạo lịch họp thành công");
            navigate("/sign-up-for-printer-repair");
          },
          onError: (error: any) => {
            message.error("Trùng lịch họp");
            const { data } = error;
            if (data?.response?.data?.statusCode === 401) {
              message.error("Lỗi rồi");
            }
          },
        });
      }
    },
    [id, user?.data?.id, startTime, endTime]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (dates: any, dateStrings: [string, string]) => {
    console.log("🚀 ~ onChange ~ dateStrings:", dateStrings);
    console.log("🚀 ~ onChange ~ dates:", dates);
    const startDate = new Date(dateStrings[0]);
    const endDate = new Date(dateStrings[1]);

    setStartTime(startDate);
    setEndTime(endDate);

    // form.setFieldsValue({
    //   startTime: dateStrings[0], // Gán thời gian bắt đầu vào trường startTime
    //   endTime: dateStrings[1], // Gán thời gian kết thúc vào trường endTime
    // });
  };

  const onOk = (dates: any) => {
    console.log("onOk:", dates);
  };

  // const handleConfirmReturnPrinter = () => {
  //   try {
  //     // Cập nhật trường isConfirmed thành true, viết 1 api chỉ update trường đó thôi, viết update đó no có hiểu gì đâu? này update này update tổng thì mấy kia d
  //     updateConfirmPrinftMutation.mutate(
  //       { isConfirmed: true },
  //       {
  //         onSuccess: () => {
  //           message.success("Đã trả máy in về khoa");
  //         },
  //         onError: () => {
  //           message.error("Cập nhật thất bại");
  //         },
  //       }
  //     );

  //     // Hiển thị thông báo đã trả máy in về khoa
  //   } catch (error) {
  //     // Xử lý lỗi nếu có
  //     console.error("Lỗi khi xác nhận trả máy in:", error);
  //     message.error("Đã xảy ra lỗi khi xác nhận trả máy in");
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

  // useEffect(() => {
  //   if (initialValues) {
  //     form.setFieldsValue(initialValues);
  //   }
  // }, [form, initialValues]);

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
              label="Thời gian bắt đầu - Thời gian kết thúc"
              name="rangePicker"
            >
              <Space direction="vertical" size={12}>
                <RangePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                />
              </Space>
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
