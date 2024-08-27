import { Footer } from '@/components';
import { register } from '@/services/ant-design-pro/api';
import {
  GithubOutlined,
  GoogleOutlined,
  InstagramOutlined,
  LockOutlined,
  TwitterOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

// TODO: 因为大部分从登录复制，后续要继续优化
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>
      <WechatOutlined key="WechatOutlined" className={styles.action}></WechatOutlined>
      <GoogleOutlined key="GoogleOutlined" className={styles.action}></GoogleOutlined>
      <GithubOutlined key="GithubOutlined" className={styles.action}></GithubOutlined>
      <TwitterOutlined key="TwitterOutlined" className={styles.action}></TwitterOutlined>
      <InstagramOutlined key="InstagramOutlined" className={styles.action}></InstagramOutlined>
    </>
  );
};

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Register: React.FC = () => {
  const [userRegisterState, setUserRegisterState] = useState<API.RegisterResult>({});
  const { styles } = useStyles();
  const intl = useIntl();

  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      // 注册
      const msg = await register({ ...values });
      if (msg.status === 'ok') {
        const defaultRegisterSuccessMessage = intl.formatMessage({
          id: 'pages.register.success',
        });
        message.success(defaultRegisterSuccessMessage);
        history.push('/user/login');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserRegisterState(msg);
    } catch (error) {
      const defaultRegisterFailureMessage = intl.formatMessage({
        id: 'pages.register.failure',
      });
      console.log(error);
      message.error(defaultRegisterFailureMessage);
    }
  };
  const { status, type: registerType } = userRegisterState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.register',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{ searchConfig: { submitText: '注册' } }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.subTitle' })}
          actions={[
            <FormattedMessage key="registerWith" id="pages.regitster.registerWith" />,
            <ActionIcons key="icons" />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {status === 'error' && registerType === 'account' && (
            <RegisterMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
              })}
            />
          )}
          {
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.username.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.password.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.password.required" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.checkPassword.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.password.required" />,
                  },
                ]}
              />
            </>
          }
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                已有账户? <a href="/user/login"> 登录</a>
              </div>
            </div>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
