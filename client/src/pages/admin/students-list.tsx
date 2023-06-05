import { useState, useMemo } from 'react';
import { Button, Row, Layout, Table } from 'antd';
import { Session, withSession } from 'components/withSession';
import { AdminPageLayout } from 'components/PageLayout';
import { getCoursesProps as getServerSideProps } from 'modules/Course/data/getCourseProps';
import { Course, CourseRole } from 'services/models';
import { StudentsListService } from "../../services/studentsList";
import {Student1Dto} from "../../api";
import { ColumnsType } from "antd/lib/table";
import {useAsync} from "react-use";
import {stringSorter} from "../../components/Table";
import {GithubUserLink} from "../../components/GithubUserLink";

const { Content } = Layout;
type Props = { session: Session; courses: Course[] };

function Page(props: Props) {
  const [data, setData] = useState<Student1Dto[]>([]);
  const studentsListService = useMemo(() => new StudentsListService(), []);

  const { loading } = useAsync(async () => {
    const  students  =  await studentsListService.getStudents();
    setData(students);
  }, []);



  return (

    <AdminPageLayout session={props.session} title="Student's list" styles={{margin: 0, padding: 0}} loading={loading} courses={props.courses}>

      <Content style={{ backgroundColor: '#F0F2F5' }}>
        <Row justify="end" style={{ padding: '16px', backgroundColor: '#FFF'}}>
          <Button type="default" style={{marginRight: 8 }}>
            Export CSV
          </Button>
          <Button type="primary">
            Invite as a Mentor
          </Button>
        </Row>
        <Table
          size="small"
          style={{ margin: 16, minHeight: 'calc(100vh - 155px)' }}
          dataSource={data}
          pagination={{ pageSize: 100 }}
          rowKey="id"
          columns={getColumns()}
        />
      </Content>
    </AdminPageLayout>
  );
}

export { getServerSideProps };

export default withSession(Page, { requiredAnyCourseRole: CourseRole.Manager });


function getColumns(): ColumnsType<Student1Dto> {
  return [
    {
      title: 'Student',
      dataIndex: 'githubId',
      key: 'githubId',
      width: 100,
      sorter: stringSorter('githubId'),
      render: (value: string, row) => <GithubUserLink value={value} firstName={row?.firstName} lastName={row?.lastName} />,
    },
    // {
    //   title: 'Ongoing Courses',
    //   dataIndex: 'ongoingCourses',
    //   //sorter: stringSorter<TaskDto>('name'),
    //   // ...getColumnSearchProps('name'),
    // },
    // {
    //   title: 'Previous Courses',
    //   dataIndex: 'previousCourses',
    //   //sorter: stringSorter<TaskDto>('discipline'),
    // },
    // {
    //   title: 'Country',
    //   dataIndex: 'country',
    //   //render: tagsRenderer,
    // },
    // {
    //   title: 'City',
    //   dataIndex: 'city',
    //   //render: tagsRenderer,
    // },
    // {
    //   title: 'Languages',
    //   dataIndex: 'languages',
    //   // sorter: stringSorter<TaskDto>('type'),
    //   // filters: TASK_TYPES.map(type => ({ text: type.name, value: type.id })),
    //   // onFilter: (value, record) => record.type === value,
    // },
    // {
    //   title: 'Total Score',
    //   dataIndex: 'totalScore',
    // },
    // {
    //   title: 'Action',
    //   dataIndex: 'actions',
    // },
  ];
}
