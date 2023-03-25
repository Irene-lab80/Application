import React, { useState } from 'react';
import { Button, GoBackBtn } from 'shared';
import { useCreateProductMutation } from 'store/query/Posts';
import { Form, Input, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import style from './ProductCreatePage.module.scss';

export const ProductCreatePage = () => {
  const [title, setTitle] = useState('');
  const [createProduct, data] = useCreateProductMutation();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const valuesToSend = { ...values };
    valuesToSend.date = new Date();
    createProduct(valuesToSend);
  };

  const categoryOptions = [
    { label: 'Автомобили', value: 'Автомобили' },
    { label: 'Аксессуары', value: 'Аксессуары' },
    { label: 'Одежда', value: 'Одежда' },
    { label: 'Мебель', value: 'Мебель' },
    { label: 'Спорт', value: 'Спорт' },
    { label: 'Техника', value: 'Техника' },
    { label: 'Товары для дома', value: 'Товары для дома' },
  ];

  return (
    <div>
      <GoBackBtn>Вернуться назад</GoBackBtn>
      <div className={style.header}>
        <div className={style.title}>{title}</div>
        <Button htmlType="submit" onClick={() => form.submit()}>Сохранить</Button>
      </div>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        className={style.form}
      >
        <Input.Group compact className={style.form_group}>
          <FormItem name="title" label="Название товара">
            <Input onChange={(e) => setTitle(e.target.value)} />
          </FormItem>
        </Input.Group>

        <Input.Group compact className={style.form_group}>
          <FormItem name="tag" label="Категория">
            <Select options={categoryOptions} />
          </FormItem>
        </Input.Group>

        <Input.Group compact className={style.form_group}>
          <FormItem name="price" label="Стоимость">
            <Input />
          </FormItem>
        </Input.Group>

        <Input.Group compact className={style.form_group}>
          <FormItem name="tel" label="Телефон">
            <Input />
          </FormItem>
        </Input.Group>

        <Input.Group compact className={style.form_group}>
          <FormItem name="description" label="Описание">
            <TextArea placeholder="Введите текст (до 3000 символов)" />
          </FormItem>
        </Input.Group>

        <Input.Group compact className={style.form_group}>
          <FormItem name="src" label="Фотография">
            <Input />
          </FormItem>
        </Input.Group>
      </Form>
      {data.isSuccess && 'Успешно'}
      {data.isError && 'Ошибка'}
    </div>
  );
};
