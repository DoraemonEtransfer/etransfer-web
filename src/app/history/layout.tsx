import Layout from 'pageComponents/layout';

const HistoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout isShowHeader={true} isShowSider={true}>
      {children}
    </Layout>
  );
};

export default HistoryLayout;
