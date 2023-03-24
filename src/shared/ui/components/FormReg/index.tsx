import React from 'react';
import { Checkbox, Form, Input } from 'antd';
import { useLoginUserMutation, useRegisterUserMutation } from 'store/query/AuthQuery';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slice/userSlice/slice';
import style from './FormReg.module.scss';
import { Button } from '../Button';

export const FormReg = () => {
  const [register, { isSuccess, isError }] = useRegisterUserMutation();
  // const [login, data] = useLoginUserMutation();

  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values: {email: string, password: string}) => {
    try {
      await register(values);
      if (isSuccess) {
        // dispatch(setUser({ id: values.id, email: values.email }));
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
    } finally {
      console.log(values);
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

  return (
    <div>
      {isSuccess && <div className="success">Регистрация прошла успешно!</div>}
      {isError && <div className="error">Произошла ошибка!</div>}
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
