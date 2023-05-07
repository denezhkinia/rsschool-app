import axios, { AxiosInstance } from 'axios';
import { getServerAxiosProps } from 'utils/axios';

export class StudentsListService {
  private axios: AxiosInstance;

  constructor(token?: string) {
    this.axios = axios.create(getServerAxiosProps(token, '/api/v2/students-list'));
  }

  public async getStudent(studentId: number) {
    const result = await this.axios.get(`${studentId}`);
    return result.data;
  }
}
