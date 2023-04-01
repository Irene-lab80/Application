import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, GoBackBtn } from 'shared';
import { TProduct, useGetOneProductQuery, useUpdateProductMutation } from 'store/query/Posts';
import { Form, Input, Radio, RadioChangeEvent, Select, Spin } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { toast } from 'react-toastify';
import { paths } from 'app/Routes/configRoutes';
import { MaskedInput } from 'antd-mask-input';
import style from './ProductEditPage.module.scss';

export const ProductEditPage = () => {
  const [radioValue, setRadioValue] = useState(1);

  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useGetOneProductQuery({ id });
  const [updateProduct, data] = useUpdateProductMutation();

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const onFinish = (values: TProduct) => {
    const valuesToSend = { ...values };
    if (id) {
      updateProduct({ id, payload: valuesToSend });
    }
    navigate(paths.USER);
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
    publish: product?.publish,
    location: product?.location,
  };

  useEffect(() => {
    if (data.isSuccess) {
      toast.success('Успешно!');
    }
    if (data.isError) {
      toast.success('Ошибка!');
    }
  }, [data.isLoading]);
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
              <MaskedInput
                mask="+7 (000) - 000 - 00 - 00"
              />
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

          <Input.Group compact className={style.form_group}>
            <FormItem name="location" label="Адрес">
              <Input />
            </FormItem>
          </Input.Group>

          <FormItem name="publish" label="Публикация">
            <Radio.Group onChange={onChange} value={radioValue}>
              <Radio value={1}>Показать</Radio>
              <Radio value={0}>Скрыть</Radio>
            </Radio.Group>
          </FormItem>
        </Form>
      </>}
    </div>
  );
};
