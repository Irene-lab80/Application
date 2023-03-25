/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Form, Input, Spin, Button as ButtonAntd } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from 'store/query/AuthQuery';
import { cookies } from 'shared/lib/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slice/userSlice/slice';
import { paths } from 'app/Routes/configRoutes';
import { useLocalStorage } from 'shared/lib/hooks';
import { toast } from 'react-toastify';
import style from './FormAuth.module.scss';
import { Button } from '../Button';

export const FormAuth = () => {
  // const [isButtonLoading, setIsButtonLoading] =
  const [userName, setUserName] = useLocalStorage('userName', '');
  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values: {email:string, password: string}) => {
    try {
      await loginUser(values);
    } catch (err) {
      toast.error('123');
      form.resetFields();
    }
  };

  useEffect(() => {
    if (userName !== '') {
      toast.success('Вход выполнен успешно!');
      navigate(paths.MAIN);
    }
  }, [userName]);

  useEffect(() => {
    if (data) {
      cookies.set('token', data.acessToken);
      dispatch(setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        secondName: data.user.secondName,
      }));
      setUserName(`${data.user.name} ${data.user.secondName}`);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Произошла ошибка!');
    }
  }, [isLoading]);

  return (
    <div className={style.wrapper}>
      <Form
        name="auth-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className={style.inputWrapper}
          name="email"
          rules={[
          { type: 'email',
            message: 'Некорректный E-mail!',
          },
          { required: true,
            message: 'Введите E-mail!',
          },
        ]}
        >
          <Input className={style.input} type="text" placeholder="Email" name="email" />
        </Form.Item>
        <Form.Item
          className={style.inputWrapper}
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password className={style.input} type="text" placeholder="Password" name="password" />
        </Form.Item>
        <Form.Item>
          <NavLink className={style.forgotPassword} to="/get-pass">Забыли пароль?</NavLink>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            loading={isLoading}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
