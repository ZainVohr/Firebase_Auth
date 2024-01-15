import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();
  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = async (values) => {
    try {
      console.log("Finish:", values);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log(userCredentials);
      const user = userCredentials.user;

      // console.log(user, "useeeer");
      // console.log(user.accessToken, "tokeeen");
      // localStorage.setItem("token", user.accessToken);
      // localStorage.setItem("user", JSON.stringify(user));
      navigate("/login");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div className="signup-form">
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Sign Up
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
