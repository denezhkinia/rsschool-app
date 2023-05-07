import { useState, useMemo } from 'react';
import {Button, Col, Input, List, Row, Layout, Form, Table} from 'antd';
import { GithubAvatar } from 'components/GithubAvatar';
import { Session, withSession } from 'components/withSession';
import { AdminPageLayout } from 'components/PageLayout';
import { getCoursesProps as getServerSideProps } from 'modules/Course/data/getCourseProps';
import { Course, CourseRole } from 'services/models';
import {StudentsListService} from "../../services/studentsList";
import {TaskDto} from "../../api";
import {ColumnsType} from "antd/lib/table";
import {boolIconRenderer, getColumnSearchProps, stringSorter, tagsRenderer} from "../../components/Table";
import {TASK_TYPES} from "../../data/taskTypes";

const { Content } = Layout;
type Props = { session: Session; courses: Course[] };

function Page(props: Props) {
  const [data, setData] = useState<TaskDto[]>([]);
  const studentsListService = useMemo(() => new StudentsListService(), []);

  return (
    <AdminPageLayout session={props.session} title="Student's list" loading={false} courses={props.courses}>
      <Content style={{ margin: 8 }}>
        <Row justify="end" style={{ padding: '16px 24px'}}>
          <Button type="default" style={{marginRight: 8 }}>
            Export CSV
          </Button>
          <Button type="primary">
            Invite as a Mentor
          </Button>
        </Row>
        <Table
          size="small"
          style={{ marginTop: 8 }}
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


function getColumns(): ColumnsType<TaskDto> {
  return [
    {
      title: 'Student',
      dataIndex: 'student',
    },
    {
      title: 'Ongoing Courses',
      dataIndex: 'ongoingCourses',
      // sorter: stringSorter<TaskDto>('name'),
      // ...getColumnSearchProps('name'),
    },
    {
      title: 'Previous Courses',
      dataIndex: 'previousCourses',
      //sorter: stringSorter<TaskDto>('discipline'),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      //render: tagsRenderer,
    },
    {
      title: 'City',
      dataIndex: 'city',
      //render: tagsRenderer,
    },
    {
      title: 'Languages',
      dataIndex: 'languages',
      // sorter: stringSorter<TaskDto>('type'),
      // filters: TASK_TYPES.map(type => ({ text: type.name, value: type.id })),
      // onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Total Score',
      dataIndex: 'totalScore',
    },
    {
      title: 'Action',
      dataIndex: 'actions',
    },
  ];
}
