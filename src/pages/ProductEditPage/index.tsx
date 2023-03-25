import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, GoBackBtn } from 'shared';
import { useGetOneProductQuery, useUpdateProductMutation } from 'store/query/Posts';
import { Form, Input, Select, Spin } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import style from './ProductEditPage.module.scss';

export const ProductEditPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetOneProductQuery({ id });
  const [updateProduct, data] = useUpdateProductMutation();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const valuesToSend = { ...values };
    valuesToSend.id = Number(id);
    // console.log(valuesToSend);
    updateProduct(valuesToSend);
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

  const initialValues = {
    title: product?.title,
    tag: product?.tag,
    price: product?.price,
    tel: product?.tel,
    description: product?.description,
    src: product?.src,
  };

  return (
    <div>
      <GoBackBtn>Вернуться назад</GoBackBtn>
      {isLoading && <Spin />}
      {isError && <div className="error">Произошла ошибка!</div>}
      {product &&
      <>
        <div className={style.header}>
          <div className={style.title}>{product?.title}</div>
          <Button htmlType="submit" onClick={() => form.submit()}>Сохранить</Button>
        </div>
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          initialValues={initialValues}
          className={style.form}
        >
          <Input.Group compact className={style.form_group}>
            <FormItem name="title" label="Название товара">
              <Input />
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
      </>}
    </div>
  );
};
