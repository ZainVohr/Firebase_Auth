import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const [userCredentials, setuserCredentials] = useState([]);
  const onFinish = async (values) => {
    try {
      console.log("Received values of form: ", values);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((user) => {
          console.log(user);
          setuserCredentials(user);
          localStorage.setItem("token", user.user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));
          console.log(userCredentials, "userstte");
          navigate("/");
          // console.log(userCredentials.user.accessToken, "asdsad");
        })
        .catch((error) => {
          toast.error("Invalid Credentials");
          console.log(error);
        });
      // const user = userCredentials.user;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address!",
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
              message: "Please input your Password!",
            },
            {
              min: 6,
              message: "Length greater than 5",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignIn;
