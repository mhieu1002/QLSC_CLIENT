import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { isNil, map } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  problemIndustries,
  problemReciever,
  prinf,
} from "../../../assets/data";
import { ROLE } from "../../../constants/role";
import { adminUserApi } from "../../../services/apis/adminUser";
import { authApi } from "../../../services/apis/authApi";
import { departmentApi } from "../../../services/apis/departmentApi";
import { prinfApi } from "../../../services/apis/prinf";
import { PrinfDto } from "../../../types/prinf";
import { PROBLEM_STATUS } from "../../../constants/problem";

const { TextArea } = Input;

const FormPrinterRepair = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
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

  const { data: prinf } = useQuery({
    queryKey: ["prinf", id],
    queryFn: () => prinfApi.getById(id as string),
    enabled: !isNil(id),
  });

  const createPrinfMutation = useMutation({
    mutationFn: (values: PrinfDto) => {
      return prinfApi.create(values);
    },
  });

  const updatePrinftMutation = useMutation({
    mutationFn: (values: PrinfDto) => {
      return prinfApi.update(id as string, values);
    },
  });

  const updateConfirmPrinftMutation = useMutation({
    mutationFn: (values: { isConfirmed: boolean }) => {
      return prinfApi.updateConfirm(id as string, values);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = {
    prinf: prinf?.data?.prinf ?? "",
    location: prinf?.data?.location ?? "",
    noteUser: prinf?.data?.noteUser ?? "",
    status: prinf?.data?.status ?? "",
    noteAdmin: prinf?.data?.noteAdmin ?? "",
    adminUserId: prinf?.data?.adminUserId ?? "",
    departmentId: prinf?.data?.departmentId ?? "",
    reciever: prinf?.data?.reciever ?? "",
    isConfirmed: prinf?.data?.isConfirmed ?? "",
  };

  const handleFinish = useCallback(
    (values: PrinfDto) => {
      const formData = {
        prinf: values.prinf,
        location: values.location,
        noteUser: values.noteUser,
        status: values.status,
        noteAdmin: values.noteAdmin,
        reciever: values.reciever ?? "",
        adminUserId: values.adminUserId ?? user?.data?.id,
        departmentId: values.departmentId ?? user?.data?.departmentId,
        isConfirmed: values.departmentId ?? user?.data?.isConfirmed,
      };

      if (id) {
        updatePrinftMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Cập nhật phiếu thành công");
            navigate("/sign-up-for-printer-repair");
          },
          onError: () => {
            message.error("Cập nhật phiếu thất bại");
          },
        });
      } else {
        createPrinfMutation.mutate(formData, {
          onSuccess: () => {
            message.success("Tạo phiếu thành công");
            navigate("/sign-up-for-printer-repair");
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

  const handleConfirmReturnPrinter = () => {
    try {
      // Cập nhật trường isConfirmed thành true, viết 1 api chỉ update trường đó thôi, viết update đó no có hiểu gì đâu? này update này update tổng thì mấy kia d
      updateConfirmPrinftMutation.mutate(
        { isConfirmed: true },
        {
          onSuccess: () => {
            message.success("Đã trả máy in về khoa");
          },
          onError: () => {
            message.error("Cập nhật thất bại");
          },
        }
      );

      // Hiển thị thông báo đã trả máy in về khoa
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi khi xác nhận trả máy in:", error);
      message.error("Đã xảy ra lỗi khi xác nhận trả máy in");
    }
  };

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

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (prinf?.data?.isConfirmed !== undefined) {
      setIsConfirmed(prinf.data.isConfirmed);
    }
  }, [prinf]);

  return (
    <section>
      <h1 style={{ padding: "15px 0", letterSpacing: "1px" }}>
        {id ? "Cập nhật" : "Đăng ký"}  phiếu sửa máy in
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
              label="Tên máy in"
              name="prinf"
              rules={[{ required: true, message: "Vui lòng nhập tên máy" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label="Phòng"
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập phòng" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item label="Chi tiết lỗi máy" name="noteUser">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          {id && (
            <Col xl={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái" },
                ]}
              >
                <Select
                  disabled={!checkRoleAdmin}
                  placeholder="Chọn nhân viên"
                  options={map(PROBLEM_STATUS, (status) => {
                    return {
                      label: status.label,
                      value: status.value,
                    };
                  })}
                />
              </Form.Item>
            </Col>
          )}

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
                rules={[{ required: true, message: "Vui lòng chọn nhân viên" }]}
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
          {user?.data.role === ROLE.SUPER_ADMIN && (
            // mh muốn cho ẩn cái người tiếp nhận bên phía user á cho thằng superAdmin nhập/ đang ẩn đó
            <Col xl={12}>
              <Form.Item label="Người tiếp nhận" name="reciever">
                <Select
                  placeholder="Chọn người tiếp nhận"
                  options={
                    map(problemReciever, (reciever) => {
                      return {
                        label: reciever.label,
                        value: reciever.value,
                      };
                    }) ?? []
                  }
                />
              </Form.Item>
            </Col>
          )}
          <Col xl={12}>
            <Form.Item label="Ghi chú" name="noteAdmin">
              <TextArea rows={4} disabled={!checkRoleAdmin} />
            </Form.Item>
          </Col>
          {prinf?.data?.status === "processed" && (
            <Col xl={12}>
              <Form.Item label="" name="isConfirmed">
                <Button type="primary" onClick={handleConfirmReturnPrinter} disabled={checkRoleAdmin}>
                  Xác nhận trả máy in
                </Button>
                <span style={{ paddingLeft: "10px" }}>
                  {isConfirmed ? "Đã trả máy về khoa" : "Chưa trả máy về khoa"}
                </span>
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          {id ? (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                // t push code cho m rồi á,
                (!checkRoleAdmin && prinf?.data?.status === "processing") ||
                (!checkRoleAdmin && prinf?.data?.status === "processed")
              }
            >
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

export default FormPrinterRepair;
