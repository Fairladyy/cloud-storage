import React from "react";
import styles from "./Auth.module.scss";
import { Form, Input, Button, notification } from "antd";
import { RegistrationFormDTO } from "@/api/dto/auth.dto";
import { setCookie } from "nookies";

import * as Api from "@/api";

export const RegistrationForm: React.FC = () => {
  const onSubmit = async (values: RegistrationFormDTO) => {
    try {
      const { token } = await Api.auth.register(values);

      notification.success({
        message: "Success!",
        description: "Redirect to admin panel",
        duration: 2,
      });

      setCookie(null, "_token", token, {
        path: "/",
      });

      location.href = "/dashboard";
    } catch (error) {
      console.warn("RegistrationForm", error);

      notification.error({
        message: "Error!",
        description: "Registration error",
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form
        name="Registration"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Enter email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Enter fullname",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Enter password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Registration
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
