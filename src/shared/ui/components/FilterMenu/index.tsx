import { Checkbox, Form } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { optionsTags } from 'shared/utils';
import { setPublish, setTags } from 'store/slice/filtersSlice/slice';
import { Button } from '../Button';
import style from './FilterMenu.module.scss';

type TProps = {
  isOpen: boolean;
  setIsFilterOpen: (arg: boolean) => void;
  setIsButtonActive: (arg: boolean) => void;
}

export const FilterMenu = ({ isOpen, setIsFilterOpen, setIsButtonActive }: TProps) => {
  const [checkedPublish, setCheckedPublish] = useState<null | CheckboxValueType[]>(null);
  const [checkedTags, setCheckedTags] = useState<null | CheckboxValueType[]>(null);

  const optionsPublish = [{ label: 'Да', value: 1 }, { label: 'Нет', value: 0 }];

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onChangePublish = (checkedValues: CheckboxValueType[]) => {
    setCheckedPublish(checkedValues);
  };

  const onChangeTag = (checkedValues: CheckboxValueType[]) => {
    setCheckedTags(checkedValues);
  };

  const onFinish = () => {
    if (checkedPublish !== null) {
      dispatch(setPublish(checkedPublish));
    }
    if (checkedTags !== null) {
      dispatch(setTags(checkedTags));
    }
    setIsFilterOpen(false);
    setIsButtonActive(true);
  };

  const onClear = () => {
    setCheckedPublish([]);
    setCheckedTags([]);
    dispatch(setPublish([]));
    dispatch(setTags([]));
    form.resetFields();
    setIsFilterOpen(false);
    setIsButtonActive(false);
  };

  return (
    <div className={isOpen ? style.menu_open : style.menu}>
      <Form
        className={style.form}
        onFinish={onFinish}
        form={form}
        layout="vertical"
      >
        <div className={style.columns}>
          <FormItem name="tag" label="Категория">
            <Checkbox.Group
              className={style.column}
              options={optionsTags}
              onChange={onChangeTag}
            />
          </FormItem>
          <FormItem className={style.column} name="publish" label="Опубликовано">
            <Checkbox.Group
              className={style.column}
              options={optionsPublish}
              onChange={onChangePublish}
            />
          </FormItem>
        </div>
        <div className={style.buttons}>
          <Button htmlType="submit">Применить</Button>
          <Button onClick={onClear} type="inverted">Сбросить</Button>
        </div>
      </Form>
    </div>
  );
};
