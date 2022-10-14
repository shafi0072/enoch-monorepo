import CreateSchedulerService from '../../service/scheduler';

export default () => {
  const service = new CreateSchedulerService();
  service.execute();
};
