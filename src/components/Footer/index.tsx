import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = 'JexHsu';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      // @ts-ignore
      copyright={
        <>
          {currentYear} {defaultMessage}
        </>
      }
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/jexhsu',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
