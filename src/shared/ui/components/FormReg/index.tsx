import React, { useEffect } from 'react';
import { Checkbox, Form, Input } from 'antd';
import { TAuth, TReg, useLoginUserMutation, useRegisterUserMutation } from 'store/query/AuthQuery';
import { useDispatch } from 'react-redux';
import { setUser, TUser } from 'store/slice/userSlice/slice';
import { toast } from 'react-toastify';
import style from './FormReg.module.scss';
import { Button } from '../Button';

export const FormReg = () => {
  const [register, data] = useRegisterUserMutation();
  // const [login] = useLoginUserMutation();
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values: TReg) => {
    try {
      await register(values);
      if (data.isSuccess) {
        // console.log(data);
        // dispatch(setUser({
        //   firstName: data.name,
        //   secondName: data.secondName,
        //   id: data.id,
        //   email: data.email,
        // }));
        form.resetFields();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const validatePassword = (rule: any, value: any, callback: any) => {
    // at least one small letter, at least one capital, at least 8 digits, no special symbols
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (
      !value.match(re)
    ) {
      callback('Пароль должен не менее 8 символов и состоять из цифр и латинских букв обоих регистров');
    } else {
      callback();
    }
  };

  useEffect(() => {
    if (data.error) {
    // @ts-ignore
      toast.error(data.error?.data);
    }
    if (data.isSuccess) {
      toast.success('Регистрация прошла успешно!');
    }
    if (data.isLoading) {
      toast('Подождите..');
    }
  }, [data.isLoading]);

  return (
    <div>
      <Form
        name="reg-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          className={style.inputWrapper}
          name="name"
          rules={[
            {
              required: true,
              message: 'Введите Имя',
            },
          ]}
        >
          <Input className={style.input} placeholder="Имя" name="name" />
        </Form.Item>
        <Form.Item
          className={style.inputWrapper}
          name="secondName"
          rules={[
            {
              required: true,
              message: 'Введите Фамилию',
            },
          ]}
        >
          <Input className={style.input} placeholder="Фамилия" name="secondName" />
        </Form.Item>
        <Form.Item
          className={style.inputWrapper}
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Некорректный формат адреса электронной почты!',
            },
            {
              required: true,
              message: 'Введите E-mail!',
            },
          ]}
        >
          <Input className={style.input} placeholder="Email" name="email" />
        </Form.Item>

        <Form.Item
          className={style.inputWrapper}
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' },
            { validator: validatePassword },
          ]}
        >
          <Input.Password className={style.input} placeholder="Пароль" name="password" />
        </Form.Item>

        <Form.Item
          className={style.inputWrapper}
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Повторите пароль',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password className={style.input} placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            Принимаю условия
            <br />
            <a href="!#">
              Пользовательского соглашения
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="default">Создать аккаунт</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
