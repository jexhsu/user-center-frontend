/* eslint-disable @typescript-eslint/no-unused-vars */
import { selectUserRole, selectUserStatus } from '@/constants';
import { deleteUser, searchUsers, updateUserInfoByAdmin } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { Button, Image, message, Tag } from 'antd';
import { Popconfirm } from 'antd/lib';
import { useRef } from 'react';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: '序号',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '用户账户',
    dataIndex: 'user_account',
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'avatar_url',
    render: (_, record) => (
      <Image
        src={record.avatar_url}
        width="40px"
        height="40px"
        style={{ borderRadius: '50%' }}
        preview={false}
      />
    ),
    align: 'center',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    ellipsis: true,
    copyable: true,
    align: 'center',
  },
  {
    title: '邮件',
    dataIndex: 'email',
    ellipsis: true,
    copyable: true,
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    // 枚举
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="magenta">女</Tag> },
      1: { text: <Tag color="blue">男</Tag> },
    },
    align: 'center',
  },
  {
    title: '用户状态',
    dataIndex: 'user_status',
    // 枚举
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="success">正常</Tag>, status: 'Success' },
      1: { text: <Tag color="warning">注销</Tag>, status: 'Default' },
      2: { text: <Tag color="error">封号</Tag>, status: 'Error' },
    },
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'user_role',
    // 枚举
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="blue">普通用户</Tag> },
      1: { text: <Tag color="cyan">管理员</Tag> },
      2: { text: <Tag color="red">封号</Tag>, status: 'Error' },
    },
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    ellipsis: true,
    valueType: 'date',
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    valueType: 'option',
    key: 'option',
    render: (text, record, _) => [
      // eslint-disable-next-line react/jsx-key
      <ModalForm<API.CurrentUser>
        title="修改用户信息"
        trigger={<Button type="link">修改</Button>}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
          //点击了提交
          console.log('values 的值为-------');
          //发起请求
          values.id = record.id;
          const isModify = await updateUserInfoByAdmin(values);
          if (isModify) {
            message.success('提交成功');
            // // 刷新用户信息表单
            // location.reload();
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            name="user_status"
            fieldProps={{
              size: 'large',
            }}
            label="用户状态"
            options={selectUserStatus}
            initialValue={record.user_status}
            placeholder={'选择用户状态'}
            rules={[
              {
                required: true,
                message: '请选择用户状态',
              },
            ]}
          />
          <ProFormSelect
            name="user_role"
            fieldProps={{
              size: 'large',
            }}
            label="用户角色"
            options={selectUserRole}
            initialValue={record.user_role}
            placeholder={'选择用户角色'}
            rules={[
              {
                required: true,
                message: '请选择用户角色',
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>,
      <a key="view">
        <Popconfirm
          title="删除用户"
          onConfirm={async (e) => {
            console.log(e);
            console.log(record.id);
            const id = record.id;
            const isDelete = await deleteUser({ id: id });
            if (isDelete) {
              message.success('删除成功');
              // 刷新用户信息表单
              location.reload();
            } else {
              message.error('删除失败');
            }
          }}
          onCancel={(e) => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={async (sort, filter) => {
        console.log(sort, filter);
        return {
          data: await searchUsers(),
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户信息"
    />
  );
};
